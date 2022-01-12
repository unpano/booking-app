package ftn.booking.controller;

import ftn.booking.dto.CottageDTO;
import ftn.booking.dto.RoomDTO;
import ftn.booking.model.Cottage;
import ftn.booking.model.CottageOwner;
import ftn.booking.model.Room;
import ftn.booking.model.User;
import ftn.booking.service.RoomService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@AllArgsConstructor
@RequestMapping( value = "/rooms")
public class RoomController {

    private RoomService roomService;
    private ModelMapper modelMapper;

    @PostMapping
    @PreAuthorize("hasRole('COTTAGE_OWNER')")
    public ResponseEntity<Room> addRoom(@RequestBody RoomDTO roomDTO){
        Room room = new Room();
        modelMapper.map(roomDTO,room);
        return new ResponseEntity<>(roomService.addRoom(room), HttpStatus.OK);
    }
}
