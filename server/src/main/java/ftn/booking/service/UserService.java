package ftn.booking.service;

import ftn.booking.model.User;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserService {


    Boolean checkIfUsernameIsAvailable(String username);
    User loadUserByUsername(String username);
    Boolean checkExistingPassword(String oldPassword, String password);
    User updateUser(User user);

    List<User> getAllNonVerifUsers();


}

