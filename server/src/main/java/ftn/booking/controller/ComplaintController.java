package ftn.booking.controller;

import ftn.booking.dto.ReservationDTO;
import ftn.booking.model.Complaint;
import ftn.booking.model.Reservation;
import ftn.booking.repository.ComplaintRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping(value = "/complaints", produces = MediaType.APPLICATION_JSON_VALUE)
public class ComplaintController {

    ComplaintRepository complaintRepository;

    @PostMapping("/add/")
    @PreAuthorize("hasRole('CLIENT')")
    public  @ResponseBody
    ResponseEntity<Complaint> add(@RequestBody Complaint complaint) {

        System.out.println( complaint.getName());
        System.out.println( complaint.getContent());

        return new ResponseEntity<>(complaintRepository.save(complaint), HttpStatus.OK);
    }
}
