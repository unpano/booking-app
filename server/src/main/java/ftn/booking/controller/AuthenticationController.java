package ftn.booking.controller;

import ftn.booking.dto.JwtAuthenticationRequest;
import ftn.booking.dto.LoginDTO;
import ftn.booking.dto.UserDTO;
import ftn.booking.exception.NotFoundException;
import ftn.booking.exception.ResourceConflictException;
import ftn.booking.exception.ValidationException;
import ftn.booking.model.*;
import ftn.booking.model.enums.Role;
import ftn.booking.service.*;
import ftn.booking.utils.TokenUtils;
import ftn.booking.utils.ValidationUtils;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@RestController
@AllArgsConstructor
@RequestMapping(value = "/auth", produces = MediaType.APPLICATION_JSON_VALUE)
public class AuthenticationController {

    private TokenUtils tokenUtils;
    private AuthenticationManager authenticationManager;
    private UserService userService;
    private ModelMapper modelMapper;
    private AuthorityService authorityService;
    private ClientService clientService;
    private OwnerService ownerService;
    private final PasswordEncoder passwordEncoder;


    private MailService mailService;

    //ADDED

    //private Mail mail;

    @PostMapping("/signup")

    public ResponseEntity<String> registerUser(@RequestBody UserDTO userDTO){

        User existUser = this.userService.loadUserByUsername(userDTO.getEmail());

        if (existUser != null) {
            throw new ResourceConflictException(existUser.getId(), "Username already exists");
        }

        if(!ValidationUtils.isValidPassword(userDTO.getPassword()))
            throw new ValidationException("Password is not valid.");

        if(Objects.equals(userDTO.getUserType(), Role.ROLE_CLIENT)) {

            //namapiram dto podatke na klijenta
            Client client = new Client();
            modelMapper.map(userDTO, client);

            //dodelim mu ROLE_CLIENT
            Authority authority = authorityService.findByName(userDTO.getUserType());

            if(authority == null)
                throw new NotFoundException("Role with user type: " + userDTO.getUserType() + " not found");
            List<Authority> authorityList = (List<Authority>) client.getAuthorities();
            authorityList.add(authority);
            client.setAuthorities(authorityList);

            //klijent aktivira profil preko linka
            client.setEnabled(false);
            client.setPicture("");
            client.setRole(Role.ROLE_CLIENT);
            client.setNumOfPenalties(0);
            client.setPassword(passwordEncoder.encode(client.getPassword()));
            client.setLastPasswordResetDate(Timestamp.valueOf(LocalDateTime.now()));


            //mailService.sendMailSimplified(client.getEmail(), "CAo","Uspeli smo!!");



            //kreiram klijenta
            clientService.add(client);

        }else if(Objects.equals(userDTO.getUserType(), Role.ROLE_BOAT_OWNER)) {

            //namapiram dto podatke na vlasnika broda
            BoatOwner boatOwner = new BoatOwner();
            modelMapper.map(userDTO, boatOwner);

            //dodelim mu ROLE_BOAT_OWNER
            Authority authority = authorityService.findByName(userDTO.getUserType());

            if(authority == null)
                throw new NotFoundException("Role with user type: " + userDTO.getUserType() + " not found");
            List<Authority> authorityList = (List<Authority>) boatOwner.getAuthorities();
            authorityList.add(authority);
            boatOwner.setAuthorities(authorityList);

            //admin odobrava zahtev za registraciju
            boatOwner.setEnabled(false);
            boatOwner.setRole(Role.ROLE_BOAT_OWNER);
            boatOwner.setPicture("");
            boatOwner.setReasonForRegistration(userDTO.getReason());
            boatOwner.setPassword(passwordEncoder.encode(boatOwner.getPassword()));
            boatOwner.setLastPasswordResetDate(Timestamp.valueOf(LocalDateTime.now()));

            //kreiram vlasnika broda
            ownerService.addBoatOwner(boatOwner);

        }else if(userDTO.getUserType() == Role.ROLE_COTTAGE_OWNER){

            //namapiram dto podatke na vlasnika vikendice
            CottageOwner cottageOwner = new CottageOwner();
            modelMapper.map(userDTO, cottageOwner);

            //dodelim mu ROLE_COTTAGE_OWNER
            Authority authority = authorityService.findByName(userDTO.getUserType());

            if(authority == null)
                throw new NotFoundException("Role with user type: " + userDTO.getUserType() + " not found");
            List<Authority> authorityList = (List<Authority>) cottageOwner.getAuthorities();
            authorityList.add(authority);
            cottageOwner.setAuthorities(authorityList);

            //admin odobrava zahtev za registraciju
            cottageOwner.setEnabled(false);
            cottageOwner.setRole(Role.ROLE_COTTAGE_OWNER);
            cottageOwner.setPicture("");
            cottageOwner.setReasonForRegistration(userDTO.getReason());
            cottageOwner.setPassword(passwordEncoder.encode(cottageOwner.getPassword()));
            cottageOwner.setLastPasswordResetDate(Timestamp.valueOf(LocalDateTime.now()));

            //kreiram vlasnika vikendice
            ownerService.addCottageOwner(cottageOwner);
        }else if(userDTO.getUserType() == Role.ROLE_INSTRUCTOR){

            //namapiram dto podatke na instruktora
            Instructor instructor = new Instructor();
            modelMapper.map(userDTO, instructor);

            //dodelim mu ROLE_INSTRUCTOR
            Authority authority = authorityService.findByName(userDTO.getUserType());

            if(authority == null)
                throw new NotFoundException("Role with user type: " + userDTO.getUserType() + " not found");
            List<Authority> authorityList = (List<Authority>) instructor.getAuthorities();
            authorityList.add(authority);
            instructor.setAuthorities(authorityList);

            //admin odobrava zahtev za registraciju
            instructor.setEnabled(false);
            instructor.setRole(Role.ROLE_INSTRUCTOR);
            instructor.setPicture("");
            instructor.setReasonForRegistration(userDTO.getReason());
            instructor.setPassword(passwordEncoder.encode(instructor.getPassword()));
            instructor.setLastPasswordResetDate(Timestamp.valueOf(LocalDateTime.now()));

            //kreiram instruktora
            ownerService.addInstructor(instructor);
        }

        return new ResponseEntity<>(HttpStatus.CREATED);

    }

    @PostMapping("/login")
    public ResponseEntity<LoginDTO> createAuthenticationToken(@RequestBody JwtAuthenticationRequest authenticationRequest) {

        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(),
                        authenticationRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        User user = (User) authentication.getPrincipal();
        String jwt = tokenUtils.generateToken(user.getUsername(), user.getRole().toString());
        int expiresIn = tokenUtils.getExpiredIn();
        UserTokenState userTokenState = new UserTokenState(jwt,expiresIn);
        return ResponseEntity.ok(new LoginDTO(userTokenState.getAccess_token(),userTokenState.getExpires_in(),user.getRole(), user.getId(),user.getEmail(),user.getPicture()));
    }

    @GetMapping("/check-username/{username}")
    public ResponseEntity<Boolean> checkIfUsernameIsAvailable(@PathVariable String username){
        //vraca false ako je zauzeto ime (vec postoji korisnik)
        return new ResponseEntity<>(userService.checkIfUsernameIsAvailable(username), HttpStatus.OK);
    }

    @GetMapping("/role")
    public ResponseEntity<String> getRole(HttpServletRequest request) {
        String token = tokenUtils.getToken(request);
        return ResponseEntity.ok(tokenUtils.getRoleFromToken(token));
    }

    // U slucaju isteka vazenja JWT tokena, endpoint koji se poziva da se token osvezi
    @PostMapping(value = "/refresh")
    public ResponseEntity<UserTokenState> refreshAuthenticationToken(HttpServletRequest request) {
        String token = tokenUtils.getToken(request);
        String refreshedToken = tokenUtils.refreshToken(token);
        int expiresIn = tokenUtils.getExpiredIn();
        return ResponseEntity.ok(new UserTokenState(refreshedToken, expiresIn));
    }

}
