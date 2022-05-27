package ftn.booking.service.impl;

import ftn.booking.dto.AdminDTO;
import ftn.booking.dto.UserDTO;
import ftn.booking.model.User;
import ftn.booking.model.enums.Role;
import ftn.booking.repository.UserRepository;
import ftn.booking.service.UserService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService, UserDetailsService {

    private UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private ModelMapper modelMapper;


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

    @Override
    public List<UserDTO> getAllNonVerifUsers(){
        List<User> allUsers = userRepository.findAll();
        List<UserDTO> allNotRegUsers = new ArrayList<>();

        for(User user: allUsers) {
            if(!user.isEnabled()){
                if(user.getRole().equals(Role.ROLE_COTTAGE_OWNER) ||
                        user.getRole().equals(Role.ROLE_INSTRUCTOR) ||
                        user.getRole().equals(Role.ROLE_BOAT_OWNER)
                       ){
                    UserDTO  userDTO = modelMapper.map(user,UserDTO.class);
                    userDTO.setUserType(user.getRole());
                    userDTO.setRejectedVerification(user.getRejectedVerification());
                      allNotRegUsers.add(userDTO);

                }
            }
        }
        return allNotRegUsers;
    }

    @Override
    public List<UserDTO> getAllVerifiedUsers(){
        List<User> allUsers = userRepository.findAll();
        List<UserDTO> allRegUsers = new ArrayList<>();

        for(User user: allUsers) {
            if(user.isEnabled()){
                if(user.getRole().equals(Role.ROLE_COTTAGE_OWNER) ||
                        user.getRole().equals(Role.ROLE_INSTRUCTOR) ||
                        user.getRole().equals(Role.ROLE_BOAT_OWNER) ||
                        user.getRole().equals(Role.ROLE_CLIENT))
                        {
                    UserDTO  userDTO = modelMapper.map(user,UserDTO.class);
                    userDTO.setUserType(user.getRole());
                    allRegUsers.add(userDTO);

                }
            }
        }
        return allRegUsers;
    }

    @Override
    public UserDTO verifyOne(String email){
        User nonVerifUser = userRepository.findByEmail(email);
        nonVerifUser.setEnabled(Boolean.TRUE);
        if(nonVerifUser.getRejectedVerification().equals(Boolean.TRUE)){
            nonVerifUser.setRejectedVerification(Boolean.FALSE);
        }
        UserDTO verifiedUser = modelMapper.map(userRepository.save(nonVerifUser),UserDTO.class);
        verifiedUser.setUserType(nonVerifUser.getRole());

        return verifiedUser;

    }

    @Override
    public UserDTO rejectVerification(String email){
        User forRejectionUser = userRepository.findByEmail(email);
        forRejectionUser.setRejectedVerification(Boolean.TRUE);
        UserDTO rejectedUser = modelMapper.map(userRepository.save(forRejectionUser),UserDTO.class);
        rejectedUser.setUserType(forRejectionUser.getRole());

        return rejectedUser;

    }

    @Override
    public UserDTO changeAdminInfo(UserDTO changedAdmin, String email){
        User unsavedAdmin = userRepository.findByEmail(email);
        unsavedAdmin.setFirstName(changedAdmin.getFirstName());
        unsavedAdmin.setLastName(changedAdmin.getLastName());
        unsavedAdmin.setAddress(changedAdmin.getAddress());
        unsavedAdmin.setCity(changedAdmin.getCity());
        unsavedAdmin.setCountry(changedAdmin.getCountry());
        unsavedAdmin.setPhoneNumber(changedAdmin.getPhoneNumber());

        userRepository.save(unsavedAdmin);

        return modelMapper.map(unsavedAdmin,UserDTO.class);
    }

    @Override
    public UserDTO getOneAdminByEmail(String email){
        User user = userRepository.findByEmail(email);
        UserDTO userDTO = modelMapper.map(user,UserDTO.class);
        Boolean hasDeactReq = user.getHasDeactivationRequest();
        if(hasDeactReq.equals(Boolean.TRUE) || hasDeactReq.equals(Boolean.FALSE)){
            userDTO.setHasDeactivationRequest(user.getHasDeactivationRequest());
        }
        userDTO.setUserType(user.getRole());
        return userDTO;
    }

    @Override
    public UserDTO getOneBoatOwnerByEmail(String email){
        User user = userRepository.findByEmail(email);
        UserDTO userDTO = modelMapper.map(user,UserDTO.class);
        Boolean hasDeactReq = user.getHasDeactivationRequest();
        if(hasDeactReq.equals(Boolean.TRUE) || hasDeactReq.equals(Boolean.FALSE)){
            userDTO.setHasDeactivationRequest(user.getHasDeactivationRequest());
        }
        userDTO.setUserType(user.getRole());
        return userDTO;
    }

    @Override
    public UserDTO getOneCottageOwnerByEmail(String email){
        User user = userRepository.findByEmail(email);
        UserDTO userDTO = modelMapper.map(user,UserDTO.class);
        Boolean hasDeactReq = user.getHasDeactivationRequest();
        if(hasDeactReq.equals(Boolean.TRUE) || hasDeactReq.equals(Boolean.FALSE)){
            userDTO.setHasDeactivationRequest(user.getHasDeactivationRequest());
        }
        userDTO.setUserType(user.getRole());
        return userDTO;
    }

    @Override
    public UserDTO getOneClientByEmail(String email){
        User user = userRepository.findByEmail(email);
        UserDTO userDTO = modelMapper.map(user,UserDTO.class);
        Boolean hasDeactReq = user.getHasDeactivationRequest();
        if(hasDeactReq.equals(Boolean.TRUE) || hasDeactReq.equals(Boolean.FALSE)){
            userDTO.setHasDeactivationRequest(user.getHasDeactivationRequest());
        }
        userDTO.setUserType(user.getRole());
        return userDTO;
    }

    @Override
    public UserDTO getOneInstructorByEmail(String email){
        User user = userRepository.findByEmail(email);
        UserDTO userDTO = modelMapper.map(user,UserDTO.class);
        Boolean hasDeactReq = user.getHasDeactivationRequest();
        if(hasDeactReq.equals(Boolean.TRUE) || hasDeactReq.equals(Boolean.FALSE)){
            userDTO.setHasDeactivationRequest(user.getHasDeactivationRequest());
        }

        userDTO.setUserType(user.getRole());
        return userDTO;
    }




    @Override
    public UserDTO getUser(String email){
        User user = userRepository.findByEmail(email);
        UserDTO userDTO = modelMapper.map(user,UserDTO.class);
        userDTO.setUserType(user.getRole());

        Boolean hasDeactReq = user.getHasDeactivationRequest();
        if(hasDeactReq.equals(Boolean.TRUE) || hasDeactReq.equals(Boolean.FALSE)){
            userDTO.setHasDeactivationRequest(user.getHasDeactivationRequest());
        }

        return userDTO;

    }
}
