package ftn.booking.Controllers;


import ftn.booking.model.Boat;
import ftn.booking.service.BoatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;

import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping(value = "/boats", produces = MediaType.APPLICATION_JSON_VALUE)
public class BoatController {

    @Autowired
    private BoatService boatService;

    @GetMapping(value = "/{findAll}", produces = "application/json")
    public @ResponseBody
    List<Boat> findAll() {
        return boatService.findAll();
    }
}
