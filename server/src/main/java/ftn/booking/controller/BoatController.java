package ftn.booking.controller;


import ftn.booking.dto.BoatDTO;
import ftn.booking.dto.BoatOwnerDTO;
import ftn.booking.model.Boat;
import ftn.booking.service.BoatService;
import lombok.AllArgsConstructor;
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
    //@PreAuthorize("hasRole('ADMIN') || hasRole('CLIENT')")
    public @ResponseBody
    List<Boat> findAll(Principal loggedUser) {
        return boatService.findAll();
    }


    @GetMapping("/findOne/{boatId}")
    public ResponseEntity<Boat> findById(@PathVariable Long boatId){
        return new ResponseEntity<>(boatService.findById(boatId), HttpStatus.OK);
    }

    ///Searching for boats that are not reserved on that period
    @GetMapping("/findFree/")
    //@PreAuthorize("hasRole('CLIENT')")
    public @ResponseBody
    List<Boat> freeBoats(@RequestParam String startTime, @RequestParam String endTime)
    {
        return boatService.findFreeBoats(LocalDateTime.parse(startTime), LocalDateTime.parse(endTime));
    }

    @GetMapping("/get-all-boat-owner")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<BoatOwnerDTO>> getAllBoatOwner(){
        List<BoatOwnerDTO> allBoatOwner = boatService.getAllBoatOwner();
        return new ResponseEntity<>(allBoatOwner,HttpStatus.OK);
    }

    @DeleteMapping("/delete-boat-owner/boatOwnerId/{boatOwnerId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Boolean> deleteBoatOwner(@PathVariable Long boatOwnerId){
        Boolean isDeleted = boatService.deleteBoatOwner(boatOwnerId);
        return new ResponseEntity<>(isDeleted,HttpStatus.OK);
    }

    @GetMapping("/get-all-boats-for-admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<BoatDTO>> getAllBoatsForAdmin(){
        List<BoatDTO> allBoats = boatService.getAllBoatsForAdmin();
        return new ResponseEntity<>(allBoats,HttpStatus.OK);
    }

    @DeleteMapping("/delete-boat/boatId/{boatId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Boolean> deleteBoatByAdmin(@PathVariable Long boatId){
        Boolean isDeleted = boatService.deleteBoatByAdmin(boatId);
        return new ResponseEntity<>(isDeleted,HttpStatus.OK);
    }






}
