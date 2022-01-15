package ftn.booking.controller;

import ftn.booking.dto.BoatDTO;
import ftn.booking.model.Boat;
import ftn.booking.model.BoatOwner;
import ftn.booking.model.Cottage;
import ftn.booking.model.User;
import ftn.booking.service.BoatService;
import ftn.booking.service.UserService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;


@RestController
@AllArgsConstructor
@RequestMapping(value = "/boats", produces = MediaType.APPLICATION_JSON_VALUE)
public class BoatController {

    private BoatService boatService;
    private UserService userService;
    private ModelMapper modelMapper;

    @PostMapping
    @PreAuthorize("hasRole('BOAT_OWNER')")
    public ResponseEntity<Boat> addBoat(@RequestBody BoatDTO boatDTO, Principal loggedUser){

        User user = userService.loadUserByUsername(loggedUser.getName());
        BoatOwner boatOwner = new BoatOwner();
        boatOwner.setId(user.getId());

        Boat boat = new Boat();
        modelMapper.map(boatDTO,boat);

        boat.setBoatOwner(boatOwner);
        boat.setRate(0f);

        return new ResponseEntity<>(boatService.add(boat), HttpStatus.OK);
    }

    @GetMapping
    @PreAuthorize("hasRole('BOAT_OWNER')")
    public ResponseEntity<List<Boat>> findAllOwnerBoats(Principal loggedUser){
        User user = userService.loadUserByUsername(loggedUser.getName());
        return new ResponseEntity<>(boatService.findAllOwnerBoats(user.getId()), HttpStatus.OK);
    }

    @GetMapping(value = "/findAll", produces = "application/json")
    //@PreAuthorize("hasRole('ADMIN') || hasRole('CLIENT')")
    public @ResponseBody
    List<Boat> findAll(Principal loggedUser) {
        return boatService.findAll();
    }


    @GetMapping("/findOne/{boatId}")
    public ResponseEntity<Boat> findById(@PathVariable Long boatId){
        return new ResponseEntity<>(boatService.findById(boatId), HttpStatus.OK);
    }

    ///Searching for boats that are not reserved on that period
    @GetMapping("/findFree/")
    //@PreAuthorize("hasRole('CLIENT')")
    public @ResponseBody
    List<Boat> freeBoats(@RequestParam String startTime, @RequestParam String endTime)
    {
        return boatService.findFreeBoats(LocalDateTime.parse(startTime), LocalDateTime.parse(endTime));
    }


}
