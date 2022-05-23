package ftn.booking.controller;


import ftn.booking.dto.CottageOwnerDTO;
import ftn.booking.service.CottageService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(value = "/cottageOwner", produces = MediaType.APPLICATION_JSON_VALUE)
public class CottageOwnerController {

    private CottageService cottageService;
    @GetMapping("/get-all-cottage-owners")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<CottageOwnerDTO>> getAllCottageOwners(){
        List<CottageOwnerDTO> allCottageOwners = cottageService.getAllCottageOwners();
        return new ResponseEntity<>(allCottageOwners, HttpStatus.OK);
    }

    @DeleteMapping("/delete-cottage-owner/cottageOwnerId/{cottageOwnerId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Boolean> deleteCottageOwner(@PathVariable Long cottageOwnerId){
        Boolean isDeleted = cottageService.deleteCottageOwner(cottageOwnerId);
        return new ResponseEntity<>(isDeleted,HttpStatus.OK);
    }

}
