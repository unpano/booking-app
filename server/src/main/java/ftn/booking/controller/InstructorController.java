package ftn.booking.controller;


import ftn.booking.dto.*;
import ftn.booking.exception.ValidationException;
import ftn.booking.model.*;
import ftn.booking.service.AdventureService;
import ftn.booking.service.InstructorService;
import ftn.booking.service.UserService;
import ftn.booking.utils.ValidationUtils;
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
    public ResponseEntity<InstructorDTO> findInstructorByUsername(@PathVariable String instructorUsername){
        return new ResponseEntity<>(instructorService.findInstructorByUsername(instructorUsername),HttpStatus.OK);
    }

    @PostMapping("/add-adventure/{instructorId}")
    public ResponseEntity<Adventure> addAdventure(@RequestBody AdventureDTO adventureDTO,
                                                  @PathVariable Long instructorId){

        Adventure adventure = new Adventure();
        modelMapper.map(adventureDTO,adventure);

        Instructor instructor = new Instructor();
        instructor.setId(instructorId);

        adventure.setRate(0);
        adventure.setInstructor(instructor);

        return new ResponseEntity<>(adventureService.addAdventure(adventure), HttpStatus.OK);
    }

    @DeleteMapping("/delete-adventure/adventureId/{adventureId}")
    public ResponseEntity<Boolean> deleteAdventure(@PathVariable Long adventureId){
        Boolean success = adventureService.deleteAdventure(adventureId);
        return new ResponseEntity<>(success,HttpStatus.OK);
    }


    @GetMapping("/all-adventures/{instructorId}")
    public ResponseEntity<List<AdventureDTO>> getAllAdventures(@PathVariable Long instructorId) {
        List<AdventureDTO> allAdventures = new ArrayList<>();

        allAdventures = adventureService.getAllAdventures(instructorId);
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



    @PostMapping("/add-new-action/adventureId/{adventureId}")
    public ResponseEntity<AdventureReservationDTO> addNewActionForAdventure(@RequestBody AdventureReservationDTO adventureReservationDTO,
                                                                            @PathVariable Long adventureId){

        return new ResponseEntity<>(adventureService.addNewActionForAdventure(adventureReservationDTO,adventureId),HttpStatus.OK);

    }

    @PostMapping("/add-additional-services-adventure-reservation/{adventureReservationId}")
    public ResponseEntity<List<AdventureAdditionalServiceDTO>> addAdditionalServicesForAdventureAction(
            @RequestBody List<String> additionalServicesAdvAction,
            @PathVariable Long adventureReservationId
    ) {
        List<AdventureAdditionalServiceDTO> additionalServicesReturn = adventureService.addAdditionalServicesForAdventureAction(additionalServicesAdvAction,adventureReservationId);
        return new ResponseEntity<>(additionalServicesReturn,HttpStatus.OK);

    }

    @GetMapping("/get-all-actions/adventureId/{adventureId}")
    public ResponseEntity<List<AdventureReservationDTO>> getAllActionsForAdventure(@PathVariable Long adventureId) {
        List<AdventureReservationDTO> allActionsAdventure = adventureService.getAllActionsForAdventure(adventureId);

        return new ResponseEntity<>(allActionsAdventure,HttpStatus.OK);
    }

    @GetMapping("/get-one-action/adventureReservationId/{adventureReservationId}")
    public ResponseEntity<AdventureReservationDTO> getOneActionForAdventure(@PathVariable Long adventureReservationId){
        AdventureReservationDTO actionAdventure = adventureService.getOneActionForAdventure(adventureReservationId);

        return new ResponseEntity<>(actionAdventure,HttpStatus.OK);
    }

    @GetMapping("/get-all-additional-services/adventureReservationId/{adventureReservationId}")
    public ResponseEntity<List<AdventureAdditionalServiceDTO>> getAllAdditionalServicesForReservation(@PathVariable Long adventureReservationId){
        List<AdventureAdditionalServiceDTO> allAdditionalServicesReservation = adventureService.getAllAdditionalServicesForReservation(adventureReservationId);

        return new ResponseEntity<>(allAdditionalServicesReservation,HttpStatus.OK);
    }



    @DeleteMapping("/delete-action-for-adventure/adventureReservationId/{adventureReservationId}")
    public ResponseEntity<String> deleteActionForAdventure(@PathVariable Long adventureReservationId){
        String success = adventureService.deleteActionForAdventure(adventureReservationId);
        return new ResponseEntity<>(success,HttpStatus.OK);
    }

    @PutMapping("/change-one-action/adventureReservationId/{adventureReservationId}")
    public ResponseEntity<AdventureReservationDTO> changeOneActionForAdventure(@RequestBody AdventureReservationDTO changedAction,
                                                                               @PathVariable Long adventureReservationId){
        AdventureReservationDTO savedChangedAction = adventureService.changeOneActionForAdventure(changedAction,adventureReservationId);

        return new ResponseEntity<>(savedChangedAction,HttpStatus.OK);
    }

    @PutMapping("/change-instructor-info/instructorId/{instructorId}")
    public ResponseEntity<InstructorDTO> changeInstructorInfo(@RequestBody InstructorDTO changedInstructor,
                                                           @PathVariable Long instructorId){
        InstructorDTO savedInstructor = instructorService.changeInstructorInfo(changedInstructor,instructorId);

        return new ResponseEntity<>(savedInstructor,HttpStatus.OK);

    }

    @GetMapping("/check-if-new-password-same-old/instructorId/{instructorId}/{newPassword}")
    public ResponseEntity<Boolean> checkIfNewPasswordSameOld(@PathVariable Long instructorId,
                                                             @PathVariable String newPassword){
        if(!ValidationUtils.isValidPassword(newPassword))
            throw new ValidationException("Password is not valid.");


        Boolean result = instructorService.checkIfNewPasswordSameOld(instructorId,newPassword);
        return new ResponseEntity<>(result,HttpStatus.OK);
    }


}
