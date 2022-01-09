package ftn.booking.controller;
import ftn.booking.exception.ResourceConflictException;
import ftn.booking.model.*;
import ftn.booking.service.*;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ftn.booking.dto.CottageDTO;
import ftn.booking.model.Cottage;
import ftn.booking.service.CottageService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;

import javax.validation.ConstraintViolationException;
import java.security.Principal;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping( value = "/cottages")
public class CottageController {

    private CottageService cottageService;
    private UserService userService;
    private ModelMapper modelMapper;
    private ImageService imageService;
    private RoomService roomService;
    private ReservationService reservationService;

    @GetMapping(value = "/findAll", produces = "application/json")
    public @ResponseBody List<Cottage> findAll()
    {
        return cottageService.findAll();
    }

    @GetMapping
    @PreAuthorize("hasRole('COTTAGE_OWNER')")
    public ResponseEntity<List<Cottage>> findAllOwnerCottages(Principal loggedUser){
        User user = userService.loadUserByUsername(loggedUser.getName());
        return new ResponseEntity<>(cottageService.findAllOwnerCottages(user.getId()), HttpStatus.OK);
    }

    @GetMapping("/{cottageId}")
    @PreAuthorize("hasRole('COTTAGE_OWNER')")
    public ResponseEntity<Cottage> findById(@PathVariable Long cottageId){
        return new ResponseEntity<>(cottageService.findById(cottageId), HttpStatus.OK);
    }

    @GetMapping("/{cottageId}/images")
    @PreAuthorize("hasRole('COTTAGE_OWNER')")
    public ResponseEntity<List<String>> findCottageImages(@PathVariable Long cottageId){
        return new ResponseEntity<>(imageService.findImagesByCottageId(cottageId), HttpStatus.OK);
    }

    @GetMapping("/{cottageId}/subscribers")
    @PreAuthorize("hasRole('COTTAGE_OWNER')")
    public ResponseEntity<List<Client>> findCottageSubscribers(@PathVariable Long cottageId){
        return new ResponseEntity<>(cottageService.findById(cottageId).getSubscribers(), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('COTTAGE_OWNER')")
    public ResponseEntity<String> delete(@PathVariable Long id){
        Cottage cottage = cottageService.findById(id);

        //delete if cottage had or has no reservations
        List<Reservation> reservations = reservationService.findAllByCottageId(cottage.getId());
        if(!reservations.isEmpty())
            throw new ResourceConflictException("Cottage has reservations.");

        imageService.deleteAll(cottage.getId());
        cottageService.delete(cottage);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping
    @PreAuthorize("hasRole('COTTAGE_OWNER')")
    public ResponseEntity<Cottage> addCottage(@RequestBody CottageDTO cottageDTO,Principal loggedUser){
        User user = userService.loadUserByUsername(loggedUser.getName());
        CottageOwner cottageOwner = new CottageOwner();
        cottageOwner.setId(user.getId());

        Cottage cottage = new Cottage();
        modelMapper.map(cottageDTO,cottage);
        //first save rooms to db, bcs of many-to-many link with cottage
        for (Room room: cottageDTO.getRooms()) {
            roomService.addRoom(room);
        }
        cottage.setCottageOwner(cottageOwner);

        return new ResponseEntity<>(cottageService.add(cottage), HttpStatus.OK);
    }
}
