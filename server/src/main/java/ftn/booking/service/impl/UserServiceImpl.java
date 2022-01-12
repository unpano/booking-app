package ftn.booking.service.impl;

import ftn.booking.model.User;
import ftn.booking.repository.UserRepository;
import ftn.booking.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService, UserDetailsService {

    private UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public User loadUserByUsername(String username) {
        return userRepository.findByEmail(username);
    }

    @Override
    public Boolean checkExistingPassword(String oldPassword, String password) {
        return passwordEncoder.matches(oldPassword,password);
    }

    @Override
    public User updateUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public Boolean checkIfUsernameIsAvailable(String username) {
        User user = userRepository.findByEmail(username);

        //true when username available
        return user == null;
    }
}
