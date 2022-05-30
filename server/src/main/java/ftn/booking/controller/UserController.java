package ftn.booking.controller;

import ftn.booking.dto.AdminDTO;
import ftn.booking.dto.ClientDTO;
import ftn.booking.dto.DeactivationRequestDTO;
import ftn.booking.dto.UserDTO;
import ftn.booking.emailADMIN.EmailService;
import ftn.booking.exception.ResourceConflictException;
import ftn.booking.exception.ValidationException;
import ftn.booking.model.Admin;
import ftn.booking.model.DeactivationRequest;
import ftn.booking.model.LoyaltyProgram;
import ftn.booking.model.User;
import ftn.booking.model.enums.Status;
import ftn.booking.repository.UserRepository;
import ftn.booking.service.*;
import ftn.booking.utils.ValidationUtils;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RestController
@AllArgsConstructor
@RequestMapping(value = "/users", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {

    private UserService userService;

    private AdminService adminService;

    private UserRepository userRepository;

    private ClientService clientService;


    private DeactivationRequestService deactivationRequestService;
    private ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;




    @GetMapping("/{username}")
    @PreAuthorize("hasRole('COTTAGE_OWNER') || hasRole('BOAT_OWNER') || hasRole('CLIENT') || hasRole('INSTRUCTOR')")

    public ResponseEntity<User> checkIfUsernameIsAvailable(@PathVariable String username){
        System.out.println(userService.loadUserByUsername(username));
        return new ResponseEntity<>(userService.loadUserByUsername(username), HttpStatus.OK);
    }
    
    @GetMapping("/checkPassword/{oldPassword}")
    @PreAuthorize("hasRole('COTTAGE_OWNER') || hasRole('BOAT_OWNER') || hasRole('CLIENT') || hasRole('INSTRUCTOR') || hasRole('ADMIN')")

    public ResponseEntity<Boolean> checkExistingPassword(@PathVariable String oldPassword, Principal loggedUser){
        User user = userService.loadUserByUsername(loggedUser.getName());
        return new ResponseEntity<>(userService.checkExistingPassword(oldPassword,user.getPassword()), HttpStatus.OK);
    }

    @PutMapping("/changePassword/{newPassword}")
    @PreAuthorize("hasRole('COTTAGE_OWNER') || hasRole('BOAT_OWNER') || hasRole('CLIENT') || hasRole('INSTRUCTOR') || hasRole('ADMIN')")
    public ResponseEntity<?> changePassword(@PathVariable String newPassword, Principal loggedUser){
        User user = userService.loadUserByUsername(loggedUser.getName());


        if(!ValidationUtils.isValidPassword(newPassword))
            throw new ValidationException("Password is not valid.");

        if(user.getOtherAdmin().equals(Boolean.TRUE)){
            user.setPassword(passwordEncoder.encode(newPassword));
            user.setLastPasswordResetDate(Timestamp.valueOf(LocalDateTime.now()));
            user.setChangedPassword(Boolean.TRUE);
            userService.updateUser(user);
        } else {

        user.setPassword(passwordEncoder.encode(newPassword));
        user.setLastPasswordResetDate(Timestamp.valueOf(LocalDateTime.now()));
        userService.updateUser(user);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping
    @PreAuthorize("hasRole('COTTAGE_OWNER') || hasRole('BOAT_OWNER') || hasRole('CLIENT')")
    public ResponseEntity<User> updateUser(@RequestBody UserDTO userDTO, Principal loggedUser){

        User user = userService.loadUserByUsername(loggedUser.getName());

        if(!Objects.equals(userDTO.getEmail(), user.getUsername()) && userDTO.getEmail() != null) {
            User existUser = userService.loadUserByUsername(userDTO.getEmail());
            if (existUser != null)
                throw new ResourceConflictException("User with same email already exists.");
        }

        user.setEmail(user.getEmail());
        String password = user.getPassword();
        modelMapper.map(userDTO, user);
        user.setPassword(password);

        return new ResponseEntity<>(userService.updateUser(user),HttpStatus.OK);
    }

    @PostMapping("/deactivation/{description}")
    @PreAuthorize("hasRole('COTTAGE_OWNER') || hasRole('BOAT_OWNER') || hasRole('CLIENT')")
    public ResponseEntity<DeactivationRequest> addDeactivationRequest(@PathVariable String description, Principal loggedUser){

        User user = userService.loadUserByUsername(loggedUser.getName());

        DeactivationRequest existRequest = deactivationRequestService.findByUserIdAndStatus(user.getId(), Status.PROCESSING);

        if(existRequest != null)
            throw  new ResourceConflictException("User already sent request.");

        DeactivationRequest request = new DeactivationRequest();
        request.setDescription(description);
        request.setUserId(user.getId());
        request.setStatus(Status.PROCESSING);
        return new ResponseEntity<>(deactivationRequestService.add(request), HttpStatus.OK);
    }


    @GetMapping("/unverified")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserDTO>> getAllNonVerifUsers(){
        List<UserDTO> unverifiedUsers = userService.getAllNonVerifUsers();
        return new ResponseEntity<>(unverifiedUsers,HttpStatus.OK);
    }

    @GetMapping("/verified")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserDTO>> getAllVerifiedUsers(){
        List<UserDTO> verifiedUsers = userService.getAllVerifiedUsers();
        return new ResponseEntity<>(verifiedUsers,HttpStatus.OK);
    }

    @PutMapping("/verify/{email}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserDTO> verifyOne(@PathVariable String email){
        UserDTO userVerifiedDTO = userService.verifyOne(email);

        return new ResponseEntity<>(userVerifiedDTO,HttpStatus.OK);
    }

    @PutMapping("/reject-verification/{email}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserDTO> rejectVerification(@PathVariable String email){
        UserDTO userRejectedDTO = userService.rejectVerification(email);

        return new ResponseEntity<>(userRejectedDTO,HttpStatus.OK);
    }

    @GetMapping("/get-one-admin/{email}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserDTO> getOneAdminByEmail(@PathVariable String email){
        UserDTO oneAdmin = modelMapper.map(userService.getOneAdminByEmail(email),UserDTO.class);
        return new ResponseEntity<>(oneAdmin,HttpStatus.OK);
    }

    @GetMapping("/get-one-boat-owner/{email}")
    @PreAuthorize("hasRole('BOAT_OWNER')")
    public ResponseEntity<UserDTO> getOneBoatOwnerByEmail(@PathVariable String email){
        UserDTO oneBoatOwner = modelMapper.map(userService.getOneBoatOwnerByEmail(email),UserDTO.class);
        return new ResponseEntity<>(oneBoatOwner,HttpStatus.OK);
    }


    @GetMapping("/get-one-cottage-owner/{email}")
    @PreAuthorize("hasRole('COTTAGE_OWNER')")
    public ResponseEntity<UserDTO> getOneCottageOwnerByEmail(@PathVariable String email){
        UserDTO oneCottageOwner = modelMapper.map(userService.getOneCottageOwnerByEmail(email),UserDTO.class);
        return new ResponseEntity<>(oneCottageOwner,HttpStatus.OK);
    }

    @GetMapping("/get-one-client/{email}")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<UserDTO> getOneClientByEmail(@PathVariable String email){
        UserDTO oneClient = modelMapper.map(userService.getOneClientByEmail(email),UserDTO.class);
        return new ResponseEntity<>(oneClient,HttpStatus.OK);
    }

    @GetMapping("/get-one-instructor/{email}")
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public ResponseEntity<UserDTO> getOneInstructorByEmail(@PathVariable String email){
        UserDTO oneInstructor = modelMapper.map(userService.getOneInstructorByEmail(email),UserDTO.class);

        return new ResponseEntity<>(oneInstructor,HttpStatus.OK);
    }





    @PutMapping("/change-admin-info/{email}")
    public ResponseEntity<UserDTO> changeAdminInfo(@RequestBody UserDTO changedAdmin,
                                                    @PathVariable String email){

        UserDTO savedAdmin = userService.changeAdminInfo(changedAdmin,email);

        return new ResponseEntity<>(savedAdmin,HttpStatus.OK);

    }

    @GetMapping("/check-if-admin-is-first-or-other/email/{email}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Boolean> checkIfAdminIsFirstOrOther(@PathVariable String email){
        Boolean response = adminService.checkIfAdminIsFirstOrOther(email);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @GetMapping("/check-if-other-admin-changed-password/email/{email}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Boolean> checkIfOtherAdminChangedPassword(@PathVariable String email){
        Boolean response = adminService.checkIfOtherAdminChangedPassword(email);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @GetMapping("/get-one-client/clientId/{clientId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserDTO> getOneClient(@PathVariable Long clientId){
        UserDTO oneClient = new UserDTO();
        oneClient = modelMapper.map(userRepository.findById(clientId).get(),UserDTO.class);
        return new ResponseEntity<>(oneClient,HttpStatus.OK);
    }

    @GetMapping("/get-all-clients-for-admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ClientDTO>> getAllClientsForAdmin(){
        List<ClientDTO> allClients = clientService.getAllClientsForAdmin();
        return new ResponseEntity<>(allClients,HttpStatus.OK);
    }


    @DeleteMapping("/delete-client/clientId/{clientId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Boolean> deleteClient(@PathVariable Long clientId){
        Boolean isDeleted = clientService.deleteClient(clientId);
        return new ResponseEntity<>(isDeleted,HttpStatus.OK);

    }

    @DeleteMapping("/delete-admin/adminId/{adminId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Boolean> deleteAdmin(@PathVariable Long adminId){
        Boolean isDeleted = adminService.deleteAdmin(adminId);
        return new ResponseEntity<>(isDeleted,HttpStatus.OK);

    }

    @GetMapping("/get-user/userEmail/{email}")
    @PreAuthorize("hasRole('ADMIN')|| hasRole('COTTAGE_OWNER') || hasRole('BOAT_OWNER') || hasRole('CLIENT') || hasRole('INSTRUCTOR') ")
    public ResponseEntity<UserDTO> getUser(@PathVariable String email){
        UserDTO user = userService.getUser(email);
        return new ResponseEntity<>(user,HttpStatus.OK);
    }

    @GetMapping("/get-user/userId/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long userId){
        UserDTO user = userService.getUserById(userId);
        return new ResponseEntity<>(user,HttpStatus.OK);
    }


    @PostMapping("/create-new-deactivation-request")
    @PreAuthorize("hasRole('ADMIN')|| hasRole('COTTAGE_OWNER') || hasRole('BOAT_OWNER') || hasRole('CLIENT') || hasRole('INSTRUCTOR') ")
    public ResponseEntity<DeactivationRequestDTO> createNewDeactivationRequest(@RequestBody DeactivationRequestDTO requestDTO){
        DeactivationRequestDTO returnRequest = deactivationRequestService.createNewDeactivationRequest(requestDTO);
        return new ResponseEntity<>(returnRequest,HttpStatus.OK);
    }

    @GetMapping("/get-deactivation-request/userId/{userId}")
    @PreAuthorize("hasRole('ADMIN')|| hasRole('COTTAGE_OWNER') || hasRole('BOAT_OWNER') || hasRole('CLIENT') || hasRole('INSTRUCTOR') ")
    public ResponseEntity<DeactivationRequestDTO> getDeactivationRequestByUserId(@PathVariable Long userId){
        DeactivationRequestDTO returnRequest = deactivationRequestService.getDeactivationRequestByUserId(userId);
        return new ResponseEntity<>(returnRequest,HttpStatus.OK);
    }

    @GetMapping("/get-all-deactivation-requests")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<DeactivationRequestDTO>> getAllDeactivationRequests(){
        List<DeactivationRequestDTO> allDeactivationRequests = deactivationRequestService.getAllDeactivationRequests();
        return new ResponseEntity<>(allDeactivationRequests,HttpStatus.OK);
    }

    @GetMapping("/check-if-user-can-be-deleted/userEmail/{userEmail}")
    @PreAuthorize("hasRole('ADMIN')|| hasRole('COTTAGE_OWNER') || hasRole('BOAT_OWNER') || hasRole('CLIENT') || hasRole('INSTRUCTOR')")
    public ResponseEntity<Boolean> checkIfUserCanBeDeleted(@PathVariable String userEmail){
        Boolean response = userService.checkIfUserCanBeDeleted(userEmail);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @DeleteMapping("/delete-user-by-admin/userId/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Boolean> deleteUserByAdmin(@PathVariable Long userId){
        Boolean isDeleted = userService.deleteUserByAdmin(userId);
        return new ResponseEntity<>(isDeleted,HttpStatus.OK);
    }

    @PutMapping("/reject-user-deleting-by-admin/userId/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Boolean> rejectUserDeletingByAdmin(@PathVariable Long userId){
        Boolean isRejected = userService.rejectUserDeletingByAdmin(userId);
        return new ResponseEntity<>(isRejected,HttpStatus.OK);
    }

    @PutMapping("/disable-user-account-by-admin/userId/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Boolean> disableUserAccountByAdmin(@PathVariable Long userId){
        Boolean isDisabled = userService.disableUserAccountByAdmin(userId);
        return new ResponseEntity<>(isDisabled,HttpStatus.OK);
    }

    @PutMapping("/approve-request-for-deleting-account/userId/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Boolean> approveRequestForDeletingAccount(@PathVariable Long userId){
        Boolean isChanged = deactivationRequestService.approveRequestForDeletingAccount(userId);
        return new ResponseEntity<>(isChanged,HttpStatus.OK);
    }

    @GetMapping("/get-all-loyalty-programs")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<LoyaltyProgram>> getAllLoyaltyPrograms(){
        List<LoyaltyProgram> allLoyalties = adminService.getAllLoyaltyPrograms();
        return new ResponseEntity<>(allLoyalties,HttpStatus.OK);
    }



}

