package ftn.booking.controller;

import ftn.booking.exception.ResourceConflictException;
import ftn.booking.exception.ValidationException;
import ftn.booking.model.DeactivationRequest;
import ftn.booking.model.User;
import ftn.booking.service.DeactivationRequestService;
import ftn.booking.service.UserService;
import ftn.booking.utils.ValidationUtils;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@AllArgsConstructor
@RequestMapping(value = "/users", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {

    private UserService userService;
    private DeactivationRequestService deactivationRequestService;
    private final PasswordEncoder passwordEncoder;

    @GetMapping("/{username}")
    @PreAuthorize("hasRole('COTTAGE_OWNER')")
    public ResponseEntity<User> checkIfUsernameIsAvailable(@PathVariable String username){
        return new ResponseEntity<>(userService.loadUserByUsername(username), HttpStatus.OK);
    }
    
    @GetMapping("/checkPassword/{oldPassword}")
    @PreAuthorize("hasRole('COTTAGE_OWNER')")
    public ResponseEntity<Boolean> checkExistingPassword(@PathVariable String oldPassword, Principal loggedUser){
        User user = userService.loadUserByUsername(loggedUser.getName());
        return new ResponseEntity<>(userService.checkExistingPassword(oldPassword,user.getPassword()), HttpStatus.OK);
    }

    @PutMapping("/changePassword/{newPassword}")
    @PreAuthorize("hasRole('COTTAGE_OWNER')")
    public ResponseEntity<?> changePassword(@PathVariable String newPassword, Principal loggedUser){
        User user = userService.loadUserByUsername(loggedUser.getName());

        if(!ValidationUtils.isValidPassword(newPassword))
            throw new ValidationException("Password is not valid.");

        user.setPassword(passwordEncoder.encode(newPassword));
        userService.updateUser(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/deactivation/{description}")
    @PreAuthorize("hasRole('COTTAGE_OWNER')")
    public ResponseEntity<DeactivationRequest> addDeactivationRequest(@PathVariable String description, Principal loggedUser){

        User user = userService.loadUserByUsername(loggedUser.getName());

        DeactivationRequest existRequest = deactivationRequestService.findByUserId(user.getId());

        if(existRequest.getId() != null)
            throw  new ResourceConflictException("User already sent request.");

        DeactivationRequest request = new DeactivationRequest();
        request.setDescription(description);
        request.setUser(user);
        return new ResponseEntity<>(deactivationRequestService.add(request), HttpStatus.OK);
    }
}
