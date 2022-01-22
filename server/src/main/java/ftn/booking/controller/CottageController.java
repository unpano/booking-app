package ftn.booking.controller;
import ftn.booking.dto.ReservationDTO;
import ftn.booking.dto.CottageDTO;
import ftn.booking.exception.ResourceConflictException;
import ftn.booking.model.*;
import ftn.booking.service.*;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;
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

    @GetMapping("/findAdditionalServices/{cottageId}")
    public @ResponseBody List<AdditionalService> findAdditionalServices(@PathVariable Long cottageId){
        return cottageService.findAdditionalServices(cottageId);
    }

    @GetMapping("/{cottageId}")
    public ResponseEntity<Cottage> findById(@PathVariable Long cottageId){
        return new ResponseEntity<>(cottageService.findById(cottageId), HttpStatus.OK);
    }

    @GetMapping("/{cottageId}/images")
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

    @DeleteMapping("/{cottageId}/delete-room/{roomId}")
    @PreAuthorize("hasRole('COTTAGE_OWNER')")
    public ResponseEntity<String> deleteRoom(@PathVariable Long cottageId,@PathVariable Long roomId){
        Cottage cottage = cottageService.findById(cottageId);

        Room room = roomService.findById(roomId).get();

        List<Room> rooms = cottage.getRooms();
        rooms.remove(room);
        cottage.setRooms(rooms);
        cottageService.update(cottage);

        roomService.delete(room);

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
        cottage.setRate(0f);

        return new ResponseEntity<>(cottageService.add(cottage), HttpStatus.OK);
    }

    ///Searching for cottages that are not reserved on that period
 /*   @GetMapping("/findFree/")
    @PreAuthorize("hasRole('CLIENT')")
    public @ResponseBody
    List<Cottage> freeCottages(@RequestBody ReservationDTO reservationDTO)
    {
        return cottageService.findFreeCottages(reservationDTO);
    }*/

    @PutMapping
    @PreAuthorize("hasRole('COTTAGE_OWNER')")
    public ResponseEntity<Cottage> updateCottage(@RequestBody CottageDTO cottageDTO){

        Cottage cottage = cottageService.findById(cottageDTO.getId());

        //update if cottage had or has no reservations
        List<Reservation> reservations = reservationService.findAllByCottageId(cottage.getId());
        if(!reservations.isEmpty())
            throw new ResourceConflictException("Cottage has reservations.");

        modelMapper.map(cottageDTO, cottage);

        return new ResponseEntity<>(cottageService.update(cottage),HttpStatus.OK);
    }

}
