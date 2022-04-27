package ftn.booking.service;

import ftn.booking.dto.UserDTO;
import ftn.booking.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

public interface UserService {


    Boolean checkIfUsernameIsAvailable(String username);
    User loadUserByUsername(String username);
    Boolean checkExistingPassword(String oldPassword, String password);
    User updateUser(User user);

    List<UserDTO> getAllNonVerifUsers();

    List<UserDTO> getAllVerifiedUsers();

    UserDTO verifyOne(String email);

}

