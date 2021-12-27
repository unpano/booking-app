package ftn.booking.controller;


import ftn.booking.model.Boat;
import ftn.booking.service.BoatService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;


@RestController
@AllArgsConstructor
@RequestMapping(value = "/boats")
public class BoatController {

    private BoatService boatService;

    @GetMapping(value = "/{findAll}", produces = "application/json")
    //@PreAuthorize("hasRole('ADMIN') || hasRole('CLIENT')")
    public @ResponseBody
    List<Boat> findAll(Principal loggedUser) {
        System.out.print("Boat controller! ");
        return boatService.findAll();
    }
}
