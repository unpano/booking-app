package ftn.booking.service;

import ftn.booking.model.User;

public interface UserService {

    Boolean checkIfUsernameIsAvailable(String username);
    User loadUserByUsername(String username);
    Boolean checkExistingPassword(String oldPassword, String password);
    User updateUser(User user);
    User findById(Long id);
    User findActive();
}

