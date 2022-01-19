package ftn.booking.controller;


import ftn.booking.service.ReservationService;
import ftn.booking.utils.ChartMapper;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(value = "/charts", produces = MediaType.APPLICATION_JSON_VALUE)
public class ChartController {

    private ReservationService reservationService;

    @GetMapping("/monthly/{id}")
    @PreAuthorize("hasRole('BOAT_OWNER')")
    public ResponseEntity<List<ChartMapper>> generateMonthlyData(@PathVariable Long id){

        return new ResponseEntity<>(reservationService.findMonthlyBoatData(id), HttpStatus.OK);
    }

    @GetMapping("/weekly/{id}")
    @PreAuthorize("hasRole('BOAT_OWNER')")
    public ResponseEntity<List<ChartMapper>> generateWeeklyData(@PathVariable Long id){

        return new ResponseEntity<>(reservationService.findWeeklyBoatData(id), HttpStatus.OK);
    }
}
