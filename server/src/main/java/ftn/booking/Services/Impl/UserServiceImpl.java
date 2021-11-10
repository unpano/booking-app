package ftn.booking.Services.Impl;

import ftn.booking.Models.Authority;
import ftn.booking.Models.User;
import ftn.booking.Repositories.UserRepository;
import ftn.booking.Services.AuthorityService;
import ftn.booking.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthorityService authService;


    @Override
    public User findByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username);

    }

    public Page<User> findAll() throws AccessDeniedException {
        return (Page<User>) userRepository.findAll();
    }

    public Optional<User> findById(Long id) throws AccessDeniedException {
        return userRepository.findById(id);
    }


    public User add(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setEnabled(true);
        List<Authority> auth = authService.findByName("ROLE_USER");
        user.setAuthorities(auth);


        userRepository.save(user);


        return user;
    }

    public Optional<User> delete(Long id) {
        Optional<User> userOpt = userRepository.findById(id);

        if (userOpt.isPresent()) {
            userRepository.delete(userOpt.get());
            return userOpt;
        }

        return Optional.empty();
    }

    public Optional<User> update(User user) {
        Optional<User> userOpt = userRepository.findById(user.getId());


        if (userOpt.isPresent()) {
            User existingUser = userOpt.get();

            if (user.getFirstName() != null) {
                existingUser.setFirstName(user.getFirstName());
            }

            if (user.getLastName() != null) {
                existingUser.setLastName(user.getLastName());
            }

            if (user.getUsername() != null) {
                existingUser.setUsername(user.getUsername());
            }


            if (user.getAddress() != null) {
                existingUser.setAddress(user.getAddress());
            }

            if (user.getCity() != null) {
                existingUser.setCity(user.getCity());
            }

            if (user.getCountry() != null) {
                existingUser.setCountry(user.getCountry());
            }

            if (user.getPhoneNumber() != null) {
                existingUser.setPhoneNumber(user.getPhoneNumber());
            }

            userRepository.save(existingUser);

            return Optional.of(existingUser);
        }

        return Optional.empty();
    }


}
