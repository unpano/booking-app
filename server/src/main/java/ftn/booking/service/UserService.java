package ftn.booking.service;

import ftn.booking.model.User;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface UserService {

    Boolean checkIfUsernameIsAvailable(String username);
    User loadUserByUsername(String username);
}

