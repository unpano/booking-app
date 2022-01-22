package ftn.booking.controller;

import ftn.booking.model.Action;
import ftn.booking.model.AdditionalService;
import ftn.booking.model.enums.ReservationType;
import ftn.booking.service.AditionalServiceService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(value = "/services", produces = MediaType.APPLICATION_JSON_VALUE)
public class AdditionalServiceController {

    private AditionalServiceService aditionalServiceService;


    @GetMapping(value = "/find/{entityType}/{entityId}", produces = "application/json")
    public @ResponseBody List<AdditionalService> findAllByEntityId(@PathVariable ReservationType entityType, @PathVariable Long entityId)
    {
        return aditionalServiceService.findByEntityIdAndEntityType(entityType, entityId);
    }
}
