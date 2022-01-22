package ftn.booking.controller;


import ftn.booking.model.Boat;
import ftn.booking.model.Client;
import ftn.booking.repository.ClientRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping(value = "/client", produces = MediaType.APPLICATION_JSON_VALUE)
public class ClientController {

    ClientRepository clientRepository;

    @GetMapping("/findById/{clientId}")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<Client> findById(@PathVariable Long clientId){

        return new ResponseEntity(clientRepository.findById(clientId), HttpStatus.OK);
    }
}
