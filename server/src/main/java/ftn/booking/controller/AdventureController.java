package ftn.booking.controller;

import ftn.booking.model.Adventure;
import ftn.booking.model.Boat;
import ftn.booking.service.AdventureService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(value = "/adventures", produces = MediaType.APPLICATION_JSON_VALUE)
public class AdventureController {

    AdventureService adventureService;


    @GetMapping(value = "/findAll", produces = "application/json")
    public @ResponseBody List<Adventure> findAll() {
        return adventureService.findAll();
    }


    @GetMapping("/findOne/{adventureId}")
    public ResponseEntity<Adventure> findById(@PathVariable Long adventureId)
    {
        return new ResponseEntity<>(adventureService.findById(adventureId), HttpStatus.OK);
    }

    ///Searching for adventures that are not reserved on that period
    @GetMapping("/findFree/")
    @PreAuthorize("hasRole('CLIENT')")
    public @ResponseBody
    List<Adventure> freeAdventures(@RequestParam String startTime, @RequestParam String endTime)
    {
        return adventureService.findFreeAdventures(LocalDateTime.parse(startTime), LocalDateTime.parse(endTime));
    }
}
