package ftn.booking.controller;
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
    public ResponseEntity<Cottage> findById(@PathVariable Long cottageId){
        return new ResponseEntity<>(cottageService.findById(cottageId), HttpStatus.OK);
    }

    @GetMapping("/{cottageId}/images")
    public ResponseEntity<List<String>> findCottageImages(@PathVariable Long cottageId){
        return new ResponseEntity<>(imageService.findImagesByCottageId(cottageId), HttpStatus.OK);
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

    ///Searching for boats that are not reserved on that period
    @GetMapping("/findFree/{startDateTime}/{endDateTime}")
    //@PreAuthorize("hasRole('CLIENT')")
    public @ResponseBody
    List<Cottage> freeCottages(@PathVariable LocalDateTime startDateTime,
                         @PathVariable LocalDateTime endDateTime)
    {
        return cottageService.findFreeCottages(startDateTime, endDateTime);
    }
}
