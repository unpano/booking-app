package ftn.booking.controller;


import ftn.booking.model.Action;
import ftn.booking.model.Adventure;
import ftn.booking.model.enums.ReservationType;
import ftn.booking.service.ActionService;
import ftn.booking.service.AdventureService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(value = "/actions", produces = MediaType.APPLICATION_JSON_VALUE)
public class ActionController {

    private ActionService actionService;

    @GetMapping("/delete/{actionId}")
    @PreAuthorize("hasRole('CLIENT')")
    public void deleteAction(@PathVariable Long actionId)
    {
        actionService.delete(actionId);
    }

    @GetMapping(value = "/findAll", produces = "application/json")
    public @ResponseBody List<Action> findAll() {
        return actionService.findAll();
    }

    @GetMapping(value = "/find/{entityType}/{entityId}", produces = "application/json")
    public @ResponseBody List<Action> findAllByEntityId(@PathVariable ReservationType entityType, @PathVariable Long entityId)
    {
        return actionService.findByEntityIdAndEntityType( entityType, entityId);
    }
}
