package ftn.booking.controller;

import ftn.booking.model.Boat;
import ftn.booking.model.Cottage;
import ftn.booking.service.CottageService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping( value = "/cottages")
public class CottageController {

    private CottageService cottageService;

    @GetMapping(value = "/findAll", produces = "application/json")
    public @ResponseBody List<Cottage> findAll()
    {
        return cottageService.findAll();
    }

    @GetMapping("/findOne/{cottageId}")
    public ResponseEntity<Cottage> findById(@PathVariable Long cottageId)
    {
        return new ResponseEntity<>(cottageService.findOne(cottageId), HttpStatus.OK);
    }
}
