package ftn.booking.controller;


import ftn.booking.model.Boat;
import ftn.booking.service.BoatService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;

import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@AllArgsConstructor
@RequestMapping(value = "/boats", produces = MediaType.APPLICATION_JSON_VALUE)
public class BoatController {

    private BoatService boatService;

    @GetMapping(value = "/{findAll}", produces = "application/json")
    public @ResponseBody
    List<Boat> findAll() {
        return boatService.findAll();
    }
}
