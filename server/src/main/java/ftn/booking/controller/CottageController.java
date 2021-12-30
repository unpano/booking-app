package ftn.booking.controller;

import ftn.booking.dto.CottageDTO;
import ftn.booking.model.Cottage;
import ftn.booking.model.CottageOwner;
import ftn.booking.model.User;
import ftn.booking.service.CottageService;
import ftn.booking.service.UserService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(value = "/cottages", produces = MediaType.APPLICATION_JSON_VALUE)
public class CottageController {

    private CottageService cottageService;
    private UserService userService;
    private ModelMapper modelMapper;

    @GetMapping
    @PreAuthorize("hasRole('COTTAGE_OWNER')")
    public ResponseEntity<List<Cottage>> findAllOwnerCottages(Principal loggedUser){
        User user = userService.loadUserByUsername(loggedUser.getName());
        return new ResponseEntity<>(cottageService.findAllOwnerCottages(user.getId()), HttpStatus.OK);
    }

    @GetMapping("/{cottageId}")
    @PreAuthorize("hasRole('COTTAGE_OWNER')")
    public ResponseEntity<Cottage> findById(@PathVariable Long cottageId){
        return new ResponseEntity<>(cottageService.findById(cottageId), HttpStatus.OK);
    }

    @PostMapping
    @PreAuthorize("hasRole('COTTAGE_OWNER')")
    public ResponseEntity<Cottage> addCottage(@RequestBody CottageDTO cottageDTO,Principal loggedUser){
        User user = userService.loadUserByUsername(loggedUser.getName());
        CottageOwner cottageOwner = new CottageOwner();
        cottageOwner.setId(user.getId());

        Cottage cottage = new Cottage();
        modelMapper.map(cottageDTO,cottage);
        cottage.setCottageOwner(cottageOwner);

        return new ResponseEntity<>(cottageService.add(cottage), HttpStatus.OK);
    }
}
