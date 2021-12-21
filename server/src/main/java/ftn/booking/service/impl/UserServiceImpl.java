package ftn.booking.service.impl;

import ftn.booking.model.User;
import ftn.booking.repository.UserRepository;
import ftn.booking.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService, UserDetailsService {

    private UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public User loadUserByUsername(String username) {
        return userRepository.findByEmail(username);
    }

    @Override
    public Boolean checkIfUsernameIsAvailable(String username) {
        User user = userRepository.findByEmail(username);

        //true when username available
        return user == null;
    }
}
