package ftn.booking.controller;

import ftn.booking.model.CottageSubscription;
import ftn.booking.service.CottageService;
import ftn.booking.service.CottageSubscriptionService;

import ftn.booking.service.ClientService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(value = "/Subscriptions", produces = MediaType.APPLICATION_JSON_VALUE)
public class CottageSubscriptionController {


    private CottageSubscriptionService cottageSubscriptionService;
    private CottageService cottageService;
    private ClientService clientService;

    @GetMapping("/delete/{cottageSubscriptionId}")
    @PreAuthorize("hasRole('CLIENT')")
    public void deleteSubscription(@PathVariable Long cottageSubscriptionId)
    {
        cottageSubscriptionService.delete(cottageSubscriptionId);
    }

    @GetMapping("/findAll/{clientId}")
    @PreAuthorize("hasRole('CLIENT')")
    public List<CottageSubscription> findAllSubscriptions(@PathVariable Long clientId)
    {
        return cottageSubscriptionService.findAllByClinet(clientId);
    }

    @PostMapping("/createSubscription/{cottageId}/{clientId}")
    public  @ResponseBody
    ResponseEntity<CottageSubscription> makeSubscription(@PathVariable Long cottageId, @PathVariable Long clientId) {

        CottageSubscription new_subscription= new CottageSubscription();

        new_subscription.setCottage( cottageService.findById(cottageId));
        new_subscription.setClient( clientService.findClientById(clientId));

        return new ResponseEntity<>(cottageSubscriptionService.add(new_subscription), HttpStatus.OK);
    }
}
