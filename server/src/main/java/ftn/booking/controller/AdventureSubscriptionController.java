package ftn.booking.controller;


import ftn.booking.model.AdventureSubscription;
import ftn.booking.service.AdventureService;
import ftn.booking.service.AdventureSubscriptionService;
import ftn.booking.service.ClientService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(value = "/adventureSubscriptions", produces = MediaType.APPLICATION_JSON_VALUE)
public class AdventureSubscriptionController {

    private AdventureSubscriptionService adventureSubscriptionService;
    private AdventureService adventureService;
    private ClientService clientService;

    @GetMapping("/delete/{adventureSubscriptionId}")
    public void deleteSubscription(@PathVariable Long adventureSubscriptionId)
    {
        adventureSubscriptionService.delete(adventureSubscriptionId);
    }

    @GetMapping("/findAll/{clientId}")
    public List<AdventureSubscription> findAllSubscriptions(@PathVariable Long clientId)
    {
        return adventureSubscriptionService.findAllByClinet(clientId);
    }

    @PostMapping("/createSubscription/{adventureId}/{clientId}")
    //@PreAuthorize("hasRole('CLIENT')")
    public  @ResponseBody
    ResponseEntity<AdventureSubscription> makeSubscription(@PathVariable Long adventureId, @PathVariable Long clientId) {

        AdventureSubscription new_subscription= new AdventureSubscription();

        new_subscription.setAdventure( adventureService.findById(adventureId));
        new_subscription.setClient( clientService.findClientById(clientId));

        return new ResponseEntity<>(adventureSubscriptionService.add(new_subscription), HttpStatus.OK);
    }
}
