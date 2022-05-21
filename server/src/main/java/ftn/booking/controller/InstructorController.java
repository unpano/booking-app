package ftn.booking.controller;


import ftn.booking.dto.*;
import ftn.booking.model.*;
import ftn.booking.repository.AdventureRepository;
import ftn.booking.service.AdminService;
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

    private AdminService adminService;

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

    @GetMapping("/findOneClient/{clientEmail}")
    public ResponseEntity<Client> findOneClientByEmail(@PathVariable String clientEmail){
        return new ResponseEntity<>(instructorService.findOneClientByEmail(clientEmail),HttpStatus.OK);
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
    @PreAuthorize("hasRole('INSTRUCTOR') || hasRole('CLIENT')")
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
    @PreAuthorize("hasRole('INSTRUCTOR') || hasRole('ADMIN') || hasRole('CLIENT')")
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

    @PostMapping("/add-new-booking-for-action/actionId/{adventureActionId}/clientId/{clientId}")
    @PreAuthorize("hasRole('CLIENT') || hasRole('INSTRUCTOR')")
    public ResponseEntity<AdventureActionClientsDTO> addNewBookingForAction(@PathVariable Long adventureActionId,
                                                            @PathVariable Long clientId){
        AdventureActionClientsDTO newBooking = adventureService.addNewBookingForAction(adventureActionId,clientId);
        return new ResponseEntity<>(newBooking,HttpStatus.OK);

    }

    @GetMapping("/get-all-actions-client/clientId/{clientId}")
    @PreAuthorize("hasRole('CLIENT') || hasRole('INSTRUCTOR')")
    public ResponseEntity<List<AdventureActionDTO>> getAllActionsForClient(@PathVariable Long clientId){
        List<AdventureActionDTO> allActions = adventureService.getAllActionsForClient(clientId);
        return new ResponseEntity<>(allActions,HttpStatus.OK);
    }

    @GetMapping("/get-all-booked-actions/clientId/{clientId}")
    @PreAuthorize("hasRole('CLIENT') || hasRole('INSTRUCTOR')")
    public ResponseEntity<List<AdventureActionDTO>> getAllBookedActionsForClient(@PathVariable Long clientId){
        List<AdventureActionDTO> allBookedActions = adventureService.getAllBookedActionsForClient(clientId);
        return new ResponseEntity<>(allBookedActions,HttpStatus.OK);

    }

   @DeleteMapping("/cancel-booking-for-action/actionId/{actionId}/clientId/{clientId}")
   @PreAuthorize("hasRole('CLIENT')")
   public ResponseEntity<Boolean> cancelBookingForAction(@PathVariable Long actionId,
                                                         @PathVariable Long clientId){
        Boolean isCanceled = adventureService.cancelBookingForAction(actionId,clientId);

        return new ResponseEntity<>(isCanceled,HttpStatus.OK);
   }




   @PutMapping("/change-status-of-action-booking")
   @PreAuthorize("hasRole('INSTRUCTOR')")
   public ResponseEntity<Boolean> changeStatusOfActionBooking(){
         Boolean statusOfBooking = adventureService.changeStatusOfActionBooking();
         return new ResponseEntity<>(statusOfBooking,HttpStatus.OK);
   }

   @GetMapping("/get-all-clients-booked-action/actionId/{actionId}")
   @PreAuthorize("hasRole('INSTRUCTOR')")
   public ResponseEntity<List<Client>> getAllClientsBookedAction(@PathVariable Long actionId){
        List<Client> allClientsForBookedAction = adventureService.getAllClientsBookedAction(actionId);
        return new ResponseEntity<>(allClientsForBookedAction,HttpStatus.OK);
   }

   @GetMapping("/find-adventure-id-for-action/actionId/{actionId}")
   @PreAuthorize("hasRole('INSTRUCTOR')")
   public ResponseEntity<Long> findAdventureIdForAction(@PathVariable Long actionId){
        Long adventureId = adventureService.findAdventureIdForAction(actionId);
        return new ResponseEntity<>(adventureId,HttpStatus.OK);
   }

   @PostMapping("/change-period-of-availability-instructor")
   @PreAuthorize("hasRole('INSTRUCTOR')")
   public ResponseEntity<InstructorAvailablePeriod> changePeriodOfAvailabilityInstructor(
           @RequestBody InstructorAvailablePeriod availablePeriod){
        InstructorAvailablePeriod newAvailablePeriod = instructorService.changePeriodOfAvailabilityInstructor(availablePeriod);
        return new ResponseEntity<>(newAvailablePeriod,HttpStatus.OK);
   }

   @GetMapping("/get-period-of-availability/instructorId/{instructorId}")
   @PreAuthorize("hasRole('INSTRUCTOR') || hasRole('CLIENT')")
   public ResponseEntity<InstructorAvailablePeriod> getPeriodOfAvailabilityInstructor(
                                        @PathVariable Long instructorId){
        InstructorAvailablePeriod availablePeriod = instructorService.getPeriodOfAvailabilityInstructor(instructorId);
        return new ResponseEntity<>(availablePeriod,HttpStatus.OK);
   }

   @GetMapping("/check-if-specific-client-has-report-for-action/clientId/{clientId}/actionId/{actionId}")
   @PreAuthorize("hasRole('INSTRUCTOR')")
   public ResponseEntity<Boolean> checkIfSpecificClientHasReportForAction(@PathVariable Long clientId,
                                                                          @PathVariable Long actionId){
        Boolean hasReport = adventureService.checkIfSpecificClientHasReportForAction(clientId,actionId);
        return new ResponseEntity<>(hasReport,HttpStatus.OK);
   }

   @PostMapping("/report-and-punish-client")
   @PreAuthorize("hasRole('INSTRUCTOR')")
   public ResponseEntity<AdventureActionReportDTO> reportAndPunishClient(@RequestBody AdventureActionReportDTO newReport){
        AdventureActionReportDTO returnReport = adventureService.reportAndPunishClient(newReport);
        return new ResponseEntity<>(returnReport,HttpStatus.OK);
   }

   @GetMapping("get-report-action/actionId/{actionId}/clientId/{clientId}")
   @PreAuthorize("hasRole('INSTRUCTOR') || hasRole('ADMIN')")
   public ResponseEntity<AdventureActionReportDTO> getReportForAction(@PathVariable Long actionId,
                                                                      @PathVariable Long clientId){
        AdventureActionReportDTO returnReport = adventureService.getReportForAction(actionId,clientId);
        return new ResponseEntity<>(returnReport,HttpStatus.OK);
   }

   @GetMapping("/check-if-action-is-past/actionId/{actionId}")
   @PreAuthorize("hasRole('INSTRUCTOR')")
   public ResponseEntity<Boolean> checkIfActionIsPast(@PathVariable Long actionId){
        Boolean response  = adventureService.checkIfActionIsPast(actionId);
        return new ResponseEntity<>(response,HttpStatus.OK);
   }

   @GetMapping("/get-all-reports-for-approving")
   @PreAuthorize("hasRole('ADMIN')")
   public ResponseEntity<List<AdventureActionReportDTO>> getAllReportsForApproving(){
        List<AdventureActionReportDTO> allReportsForApproving = adventureService.getAllReportsForApproving();
        return new ResponseEntity<>(allReportsForApproving,HttpStatus.OK);
   }

   @GetMapping("/get-instructor-for-specific-report/reportId/{reportId}")
   @PreAuthorize("hasRole('ADMIN')")
   public ResponseEntity<InstructorDTO> getInstructorForSpecificReport(@PathVariable Long reportId){
        InstructorDTO instructorDTO = instructorService.getInstructorForSpecificReport(reportId);
        return new ResponseEntity<>(instructorDTO,HttpStatus.OK);
   }

   @PutMapping("/set-approved-punishment-for-report/reportId/{reportId}")
   @PreAuthorize("hasRole('ADMIN')")
   public ResponseEntity<Boolean> setApprovedPunishmentForReport(@PathVariable Long reportId){
        Boolean isApproved = adminService.setApprovedPunishmentForReport(reportId);
        return new ResponseEntity<>(isApproved,HttpStatus.OK);
   }

   @PutMapping("/approve-punishment-for-client-admin/clientId/{clientId}")
   @PreAuthorize("hasRole('ADMIN')")
   public ResponseEntity<Boolean> approvePunishmentForClientAdmin(@PathVariable Long clientId){
        Boolean approved = adminService.approvePunishmentForClientAdmin(clientId);
        return new ResponseEntity<>(approved,HttpStatus.OK);
   }


}
