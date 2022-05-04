package ftn.booking.controller;


import ftn.booking.dto.AdventureDTO;
import ftn.booking.dto.CottageDTO;
import ftn.booking.dto.UserDTO;
import ftn.booking.model.*;
import ftn.booking.service.AdventureService;
import ftn.booking.service.InstructorService;
import ftn.booking.service.UserService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping( value = "/instructors")
public class InstructorController {

    private InstructorService instructorService;

    private AdventureService adventureService;

    private UserService userService;

    private ModelMapper modelMapper;


    @GetMapping(value = "/findAll")
    public @ResponseBody List<Instructor> findAll()
    {
        return instructorService.findAll();
    }


    @GetMapping("/findOne/{instructorId}")
    public ResponseEntity<Instructor> findById(@PathVariable Long instructorId)
    {
        return new ResponseEntity<>(instructorService.findOne(instructorId), HttpStatus.OK);
    }

    @GetMapping("/findInstructorByUsername/{instructorUsername}")
    public ResponseEntity<UserDTO> findInstructorByUsername(@PathVariable String instructorUsername){
        return new ResponseEntity<>(instructorService.findInstructorByUsername(instructorUsername),HttpStatus.OK);
    }

    @PostMapping("/add-adventure")
    public ResponseEntity<Adventure> addAdventure(@RequestBody AdventureDTO adventureDTO){

        Adventure adventure = new Adventure();
        modelMapper.map(adventureDTO,adventure);


        adventure.setRate(0);

        return new ResponseEntity<>(adventureService.addAdventure(adventure), HttpStatus.OK);
    }





    @GetMapping("/all-adventures")
    public ResponseEntity<List<AdventureDTO>> getAllAdventures() {
        List<AdventureDTO> allAdventures = new ArrayList<>();

        allAdventures = adventureService.getAllAdventures();
        return new ResponseEntity<>(allAdventures,HttpStatus.OK);
    }

    @GetMapping("/one-adventure/{adventureId}")
    public ResponseEntity<AdventureDTO> getOneAdventure(@PathVariable Long adventureId){
        AdventureDTO adventure = adventureService.getOneAdventure(adventureId);

        return new ResponseEntity<>(adventure,HttpStatus.OK);
    }

    @PutMapping("/change-one-adventure")
    public ResponseEntity<AdventureDTO> changeOneAdventure(@RequestBody AdventureDTO changedAdventureDTO){
        Adventure changedAdventure = modelMapper.map(changedAdventureDTO,Adventure.class);
        return new ResponseEntity<>(adventureService.changeOneAdventure(changedAdventure),HttpStatus.OK);
    }

}
