package ftn.booking.controller;

import ftn.booking.dto.CottageDTO;
import ftn.booking.dto.ReportDTO;
import ftn.booking.model.*;
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
    private ModelMapper modelMapper;

    @PostMapping
    @PreAuthorize("hasRole('COTTAGE_OWNER') || hasRole('BOAT_OWNER')")
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


}
