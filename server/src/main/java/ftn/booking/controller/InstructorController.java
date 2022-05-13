package ftn.booking.controller;


import ftn.booking.dto.*;
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

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
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
    @PreAuthorize("hasRole('INSTRUCTOR')")
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
    @PreAuthorize("hasRole('INSTRUCTOR') || hasRole('ADMIN')")
    public ResponseEntity<Boolean> deleteAdventure(@PathVariable Long adventureId){
        Boolean success = adventureService.deleteAdventure(adventureId);
        return new ResponseEntity<>(success,HttpStatus.OK);
    }


    @GetMapping("/all-adventures/{instructorId}")
    @PreAuthorize("hasRole('INSTRUCTOR') || hasRole('ADMIN') || hasRole('CLIENT')")
    public ResponseEntity<List<AdventureDTO>> getAllAdventures(@PathVariable Long instructorId) {
        List<AdventureDTO> allAdventures = new ArrayList<>();

        allAdventures = adventureService.getAllAdventures(instructorId);
        return new ResponseEntity<>(allAdventures,HttpStatus.OK);
    }

    @GetMapping("/one-adventure/{adventureId}")
    @PreAuthorize("hasRole('INSTRUCTOR') || hasRole('ADMIN') || hasRole('CLIENT')")
    public ResponseEntity<AdventureDTO> getOneAdventure(@PathVariable Long adventureId){
        AdventureDTO adventure = adventureService.getOneAdventure(adventureId);

        return new ResponseEntity<>(adventure,HttpStatus.OK);
    }

    @PutMapping("/change-one-adventure")
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public ResponseEntity<AdventureDTO> changeOneAdventure(@RequestBody AdventureDTO changedAdventureDTO){
        Adventure changedAdventure = modelMapper.map(changedAdventureDTO,Adventure.class);
        return new ResponseEntity<>(adventureService.changeOneAdventure(changedAdventure),HttpStatus.OK);
    }



    @PostMapping("/add-new-action/adventureId/{adventureId}")
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public ResponseEntity<AdventureActionDTO> addNewActionForAdventure(@RequestBody AdventureActionDTO adventureReservationDTO,
                                                                       @PathVariable Long adventureId){

        return new ResponseEntity<>(adventureService.addNewActionForAdventure(adventureReservationDTO,adventureId),HttpStatus.OK);

    }

    @PostMapping("/add-additional-services-adventure-reservation/{adventureReservationId}")
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public ResponseEntity<List<AdventureAdditionalServiceDTO>> addAdditionalServicesForAdventureAction(
            @RequestBody List<String> additionalServicesAdvAction,
            @PathVariable Long adventureReservationId
    ) {
        List<AdventureAdditionalServiceDTO> additionalServicesReturn = adventureService.addAdditionalServicesForAdventureAction(additionalServicesAdvAction,adventureReservationId);
        return new ResponseEntity<>(additionalServicesReturn,HttpStatus.OK);

    }

    @GetMapping("/get-all-actions/adventureId/{adventureId}")
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public ResponseEntity<List<AdventureActionDTO>> getAllActiveActionsForAdventure(@PathVariable Long adventureId) {
        List<AdventureActionDTO> allActionsAdventure = adventureService.getAllActionsForAdventure(adventureId);

        return new ResponseEntity<>(allActionsAdventure,HttpStatus.OK);
    }

    @GetMapping("/get-all-past-actions/adventureId/{adventureId}")
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public ResponseEntity<List<AdventureActionDTO>> getAllPastActionsForAdventure(@PathVariable Long adventureId) {
        List<AdventureActionDTO> allActionsAdventure = adventureService.getAllPastActionsForAdventure(adventureId);

        return new ResponseEntity<>(allActionsAdventure,HttpStatus.OK);
    }

    @GetMapping("/get-one-action/adventureReservationId/{adventureReservationId}")
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public ResponseEntity<AdventureActionDTO> getOneActionForAdventure(@PathVariable Long adventureReservationId){
        AdventureActionDTO actionAdventure = adventureService.getOneActionForAdventure(adventureReservationId);

        return new ResponseEntity<>(actionAdventure,HttpStatus.OK);
    }

    @GetMapping("/get-all-additional-services/adventureReservationId/{adventureReservationId}")
    @PreAuthorize("hasRole('INSTRUCTOR') || hasRole('ADMIN')")
    public ResponseEntity<List<AdventureAdditionalServiceDTO>> getAllAdditionalServicesForReservation(@PathVariable Long adventureReservationId){
        List<AdventureAdditionalServiceDTO> allAdditionalServicesReservation = adventureService.getAllAdditionalServicesForReservation(adventureReservationId);

        return new ResponseEntity<>(allAdditionalServicesReservation,HttpStatus.OK);
    }



    @DeleteMapping("/delete-action-for-adventure/adventureReservationId/{adventureReservationId}")
    @PreAuthorize("hasRole('INSTRUCTOR') || hasRole('ADMIN')")
    public ResponseEntity<String> deleteActionForAdventure(@PathVariable Long adventureReservationId){
        String success = adventureService.deleteActionForAdventure(adventureReservationId);
        return new ResponseEntity<>(success,HttpStatus.OK);
    }

    @PutMapping("/change-one-action/adventureReservationId/{adventureReservationId}")
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public ResponseEntity<AdventureActionDTO> changeOneActionForAdventure(@RequestBody AdventureActionDTO changedAction,
                                                                          @PathVariable Long adventureReservationId){
        AdventureActionDTO savedChangedAction = adventureService.changeOneActionForAdventure(changedAction,adventureReservationId);

        return new ResponseEntity<>(savedChangedAction,HttpStatus.OK);
    }

    @PutMapping("/change-instructor-info/instructorId/{instructorId}")
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public ResponseEntity<InstructorDTO> changeInstructorInfo(@RequestBody InstructorDTO changedInstructor,
                                                           @PathVariable Long instructorId){
        InstructorDTO savedInstructor = instructorService.changeInstructorInfo(changedInstructor,instructorId);

        return new ResponseEntity<>(savedInstructor,HttpStatus.OK);

    }

    @GetMapping("/get-forbiden-dates-specific-action/actionId/{actionId}")
    @PreAuthorize("hasRole('INSTRUCTOR') || hasRole('CLIENT') || hasRole('ADMIN')")
    public List<LocalDateTime> getForbidenDatesSpecificAction(@PathVariable Long actionId){
        List<LocalDateTime> forbidenDates = adventureService.getForbidenDatesSpecificAction(actionId);

        return forbidenDates;
    }

    @GetMapping("/get-forbiden-dates")
    @PreAuthorize("hasRole('INSTRUCTOR') || hasRole('CLIENT') || hasRole('ADMIN')")
    public List<LocalDateTime> getForbidenDates(){
        List<LocalDateTime> forbidenDates = adventureService.getForbidenDates();
        return forbidenDates;
    }



    @PutMapping("/change-num-of-active-actions/adventureId/{adventureId}")
    @PreAuthorize("hasRole('INSTRUCTOR') || hasRole('ADMIN')")
    public Long changeNumOfActiveActions(@PathVariable Long adventureId){
        Long numOfActiveActions = adventureService.changeNumOfActiveActions(adventureId);
        return numOfActiveActions;
    }

    @PutMapping("/change-num-of-past-actions/adventureId/{adventureId}")
    @PreAuthorize("hasRole('INSTRUCTOR') || hasRole('ADMIN')")
    public Long changeNumOfPastActions(@PathVariable Long adventureId){
        Long numOfPastActions = adventureService.changeNumOfPastActions(adventureId);
        return numOfPastActions;
    }

}
