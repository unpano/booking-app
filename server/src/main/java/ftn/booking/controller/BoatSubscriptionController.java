package ftn.booking.controller;

import ftn.booking.dto.ReservationDTO;
import ftn.booking.model.BoatSubscription;
import ftn.booking.model.Reservation;
import ftn.booking.model.enums.ReservationType;
import ftn.booking.service.BoatService;
import ftn.booking.service.BoatSubscriptionService;
import ftn.booking.service.ClientService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(value = "/boatSubscriptions", produces = MediaType.APPLICATION_JSON_VALUE)
public class BoatSubscriptionController {

    private BoatSubscriptionService boatSubscriptionService;
    private BoatService boatService;
    private ClientService clientService;

    @GetMapping("/delete/{boatSubscriptionId}")
    public void deleteSubscription(@PathVariable Long boatSubscriptionId)
    {
        boatSubscriptionService.delete(boatSubscriptionId);
    }

    @GetMapping("/findAll/{clientId}")
    public List<BoatSubscription> findAllSubscriptions(@PathVariable Long clientId)
    {
        return boatSubscriptionService.findAllByClinet(clientId);
    }

    @PostMapping("/createSubscription/{boatId}/{clientId}")
    //@PreAuthorize("hasRole('CLIENT')")
    public  @ResponseBody
    ResponseEntity<BoatSubscription> makeSubscription(@PathVariable Long boatId, @PathVariable Long clientId) {

        BoatSubscription new_subscription= new BoatSubscription();

        new_subscription.setBoat( boatService.findById(boatId));
        new_subscription.setClient( clientService.findClientById(clientId));

        return new ResponseEntity<>(boatSubscriptionService.add(new_subscription), HttpStatus.OK);
    }
}
