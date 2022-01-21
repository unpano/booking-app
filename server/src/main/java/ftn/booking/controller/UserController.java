package ftn.booking.controller;

import ftn.booking.dto.UserDTO;
import ftn.booking.exception.ResourceConflictException;
import ftn.booking.exception.ValidationException;
import ftn.booking.model.DeactivationRequest;
import ftn.booking.model.User;
import ftn.booking.model.enums.Status;
import ftn.booking.service.DeactivationRequestService;
import ftn.booking.service.UserService;
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

@RestController
@AllArgsConstructor
@RequestMapping(value = "/users", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {

    private UserService userService;
    private DeactivationRequestService deactivationRequestService;
    private ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;

    @GetMapping("/{username}")
    @PreAuthorize("hasRole('COTTAGE_OWNER') || hasRole('CLIENT')")
    public ResponseEntity<User> checkIfUsernameIsAvailable(@PathVariable String username){
        return new ResponseEntity<>(userService.loadUserByUsername(username), HttpStatus.OK);
    }


    @GetMapping("/getActive/")
    public ResponseEntity<User> findActive(){
        return new ResponseEntity<>(userService.findActive(), HttpStatus.OK);
    }
    
    @GetMapping("/checkPassword/{oldPassword}")
    @PreAuthorize("hasRole('COTTAGE_OWNER') || hasRole('CLIENT')")
    public ResponseEntity<Boolean> checkExistingPassword(@PathVariable String oldPassword, Principal loggedUser){
        User user = userService.loadUserByUsername(loggedUser.getName());
        return new ResponseEntity<>(userService.checkExistingPassword(oldPassword,user.getPassword()), HttpStatus.OK);
    }

    @PutMapping("/changePassword/{newPassword}")
    @PreAuthorize("hasRole('COTTAGE_OWNER') || hasRole('CLIENT')")
    public ResponseEntity<?> changePassword(@PathVariable String newPassword, Principal loggedUser){
        User user = userService.loadUserByUsername(loggedUser.getName());

        if(!ValidationUtils.isValidPassword(newPassword))
            throw new ValidationException("Password is not valid.");

        user.setPassword(passwordEncoder.encode(newPassword));
        user.setLastPasswordResetDate(Timestamp.valueOf(LocalDateTime.now()));
        userService.updateUser(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping
    @PreAuthorize("hasRole('COTTAGE_OWNER') || hasRole('CLIENT')")
    public ResponseEntity<?> updateUser(@RequestBody UserDTO userDTO, Principal loggedUser){
        User user = userService.loadUserByUsername(loggedUser.getName());
        User existUser = userService.loadUserByUsername(userDTO.getEmail());

        if(userDTO.getEmail().equals(user.getEmail()) || existUser.getId()!=null)
            throw new ResourceConflictException("User with same email already exists.");


        modelMapper.map(userDTO, user);
        userService.updateUser(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/deactivation/{description}")
    @PreAuthorize("hasRole('COTTAGE_OWNER') || hasRole('CLIENT')")
    public ResponseEntity<DeactivationRequest> addDeactivationRequest(@PathVariable String description, Principal loggedUser){

        User user = userService.loadUserByUsername(loggedUser.getName());

        DeactivationRequest existRequest = deactivationRequestService.findByUserIdAndStatus(user.getId(), Status.PROCESSING);

        if(existRequest != null)
            throw  new ResourceConflictException("User already sent request.");

        DeactivationRequest request = new DeactivationRequest();
        request.setDescription(description);
        request.setUser(user);
        request.setStatus(Status.PROCESSING);
        return new ResponseEntity<>(deactivationRequestService.add(request), HttpStatus.OK);
    }
}
