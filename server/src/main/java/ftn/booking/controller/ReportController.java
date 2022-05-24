package ftn.booking.controller;

import ftn.booking.dto.CottageDTO;
import ftn.booking.dto.IncomeReservationDTO;
import ftn.booking.dto.ReportDTO;
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


}
