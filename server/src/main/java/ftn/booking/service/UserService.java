package ftn.booking.service;

import ftn.booking.dto.AdminDTO;
import ftn.booking.dto.UserDTO;
import ftn.booking.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface UserService {


    Boolean checkIfUsernameIsAvailable(String username);
    User loadUserByUsername(String username);
    Boolean checkExistingPassword(String oldPassword, String password);
    User updateUser(User user);

    List<UserDTO> getAllNonVerifUsers();

    List<UserDTO> getAllVerifiedUsers();

    UserDTO verifyOne(String email);

    UserDTO rejectVerification(String email);

    UserDTO changeAdminInfo(UserDTO changedAdmin, String email);

    UserDTO getOneAdminByEmail(String email);

    UserDTO getOneBoatOwnerByEmail(String email);

    UserDTO getOneCottageOwnerByEmail(String email);

    UserDTO getOneClientByEmail(String email);

    UserDTO getOneInstructorByEmail(String email);
    UserDTO getUser(String email);
}

