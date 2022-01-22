package ftn.booking.controller;


import ftn.booking.model.Client;
import ftn.booking.model.ClientRate;
import ftn.booking.model.Complaint;
import ftn.booking.repository.ClientRateRepository;
import ftn.booking.repository.ClientRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping(value = "/clientRate", produces = MediaType.APPLICATION_JSON_VALUE)
public class ClientRateController {

    private ClientRateRepository clientRateRepository;

    @PostMapping("/add/")
    @PreAuthorize("hasRole('CLIENT')")
    public  @ResponseBody ResponseEntity<ClientRate> add(@RequestBody ClientRate rate) {


        return new ResponseEntity<>( clientRateRepository.save(rate), HttpStatus.OK);
    }
}
