package ftn.booking.controller;


import ftn.booking.dto.ReservationDTO;
import ftn.booking.model.AdditionalService;
import ftn.booking.model.Boat;
import ftn.booking.model.Cottage;
import ftn.booking.model.User;
import ftn.booking.service.BoatService;
import lombok.AllArgsConstructor;
import org.apache.tomcat.jni.Local;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;


@RestController
@AllArgsConstructor
@RequestMapping(value = "/boats", produces = MediaType.APPLICATION_JSON_VALUE)
public class BoatController {

    private BoatService boatService;


    @GetMapping(value = "/findAll", produces = "application/json")
    public @ResponseBody List<Boat> findAll() {
        return boatService.findAll();
    }


    @GetMapping("/findOne/{boatId}")
    public ResponseEntity<Boat> findById(@PathVariable Long boatId)
    {
        return new ResponseEntity<>(boatService.findById(boatId), HttpStatus.OK);
    }

    @GetMapping("/findAdditionalServices/{boatId}")
    public @ResponseBody List<AdditionalService> findAdditionalServices(@PathVariable Long boatId){
        return boatService.findAdditionalServices(boatId);
    }

    ///Searching for boats that are not reserved on that period
    @GetMapping("/findFree/")
    //@PreAuthorize("hasRole('CLIENT')")
    public @ResponseBody
    List<Boat> freeBoats(Principal loggedUser, @RequestParam String startTime, @RequestParam String endTime)
    {
        return boatService.findFreeBoats(LocalDateTime.parse(startTime), LocalDateTime.parse(endTime));
    }


}
