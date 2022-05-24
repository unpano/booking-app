package ftn.booking.controller;

import ftn.booking.dto.*;
import ftn.booking.model.*;
import ftn.booking.service.AdminService;
import ftn.booking.service.ReportService;
import ftn.booking.service.ReservationService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.yaml.snakeyaml.error.Mark;

import java.security.Principal;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping( value = "/reports")
public class ReportController {

    private ReportService reportService;
    private ReservationService reservationService;

    private AdminService adminService;

    private ModelMapper modelMapper;

    @PostMapping
    @PreAuthorize("hasRole('COTTAGE_OWNER')")
    public ResponseEntity<Report> addReport(@RequestBody ReportDTO reportDTO){

        Reservation reservation = reservationService.findById(reportDTO.getReservationId());

        //if client did not show up for reservation punish him with 1 penalty
        if(reportDTO.getApproved()){
            Client client = reservation.getClient();
            client.setNumOfPenalties(client.getNumOfPenalties() + 1);
        }

        Report report = new Report();
        report.setReservation(reservation);

        modelMapper.map(reportDTO,report);

        return new ResponseEntity<>(reportService.add(report), HttpStatus.OK);
    }

    @GetMapping("/get-all-incomes-for-booked-actions")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<IncomeReservationDTO>> getAllIncomesForBookedActions(){
        List<IncomeReservationDTO> allIncomes = adminService.getAllIncomesForBookedActions();
        return new ResponseEntity<>(allIncomes,HttpStatus.OK);
    }

    @GetMapping("/get-incomes-sum")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Double> getIncomesSum(){
        Double incomeSum = adminService.getIncomesSum();
        return new ResponseEntity<>(incomeSum,HttpStatus.OK);
    }

    @GetMapping("/get-all-instructor-for-revision-and-mark/clientId/{clientId}")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<List<InstructorDTO>> getAllInstructorForRevisionAndMark(@PathVariable Long clientId){
        List<InstructorDTO> allInstructorForRevision = reportService.getAllInstructorForRevisionAndMark(clientId);
        return new ResponseEntity<>(allInstructorForRevision,HttpStatus.OK);
    }

    @GetMapping("/check-if-instructor-has-revision-from-client/clientId/{clientId}/instructorId/{instructorId}")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<Boolean> checkIfInstructorHasRevisionFromClient(@PathVariable Long clientId,
                                                                          @PathVariable Long instructorId){
        Boolean hasOrNo = reportService.checkIfInstructorHasRevisionFromClient(clientId,instructorId);
        return new ResponseEntity<>(hasOrNo,HttpStatus.OK);
    }

    @PostMapping("/add-new-mark-revision-client")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<MarkRevisionClientDTO> addNewMarkRevisionClient(@RequestBody MarkRevisionClientDTO markRevisionDTO){
        MarkRevisionClientDTO markRevisionReturn  = reportService.addNewMarkRevisionClient(markRevisionDTO);
        return new ResponseEntity<>(markRevisionReturn,HttpStatus.OK);

    }

    @GetMapping("/get-mark-revision-client-for-instructor/clientId/{clientId}/instructorId/{instructorId}")
    @PreAuthorize("hasRole('CLIENT') || hasRole('ADMIN')")
    public ResponseEntity<MarkRevisionClientDTO> getMarkRevisionClientForInstructor(@PathVariable Long clientId,
                                                                                    @PathVariable Long instructorId){
        MarkRevisionClientDTO markRevisionReturn = reportService.getMarkRevisionClientForInstructor(clientId,instructorId);
        return new ResponseEntity<>(markRevisionReturn,HttpStatus.OK);
    }

    @GetMapping("/get-all-not-approved-marks-revisions")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<MarkRevisionClientDTO>> getAllNotApprovedMarksRevisions(){
        List<MarkRevisionClientDTO> allNotApprovedMarksRevisions = reportService.getAllNotApprovedMarksRevisions();
        return new ResponseEntity<>(allNotApprovedMarksRevisions,HttpStatus.OK);
    }

    @GetMapping("/get-all-approved-marks-revisions")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<MarkRevisionClientDTO>> getAllApprovedMarksRevisions(){
        List<MarkRevisionClientDTO> allApprovedMarksRevisions = reportService.getAllApprovedMarksRevisions();
        return new ResponseEntity<>(allApprovedMarksRevisions,HttpStatus.OK);
    }



}
