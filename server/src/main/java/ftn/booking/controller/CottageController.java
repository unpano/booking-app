package ftn.booking.controller;

import ftn.booking.model.Boat;
import ftn.booking.model.Cottage;
import ftn.booking.service.CottageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping( value = "/cottages")
public class CottageController {

    @Autowired
    private CottageService cottageService;

    @GetMapping(value = "/{findAll}", produces = "application/json")
    public @ResponseBody List<Cottage> findAll() {

        return cottageService.findAll();
    }
}
