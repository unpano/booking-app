package ftn.booking.controller;

import ftn.booking.dto.CottageDTO;
import ftn.booking.dto.ReservationDTO;
import ftn.booking.exception.PeriodConflictException;
import ftn.booking.model.*;
import ftn.booking.model.enums.ReservationType;
import ftn.booking.service.BoatService;
import ftn.booking.service.CottageService;
import ftn.booking.service.ReservationService;
import ftn.booking.service.UserService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping( value = "/reservations")
public class ReservationController {

    private ReservationService reservationService;
    private UserService userService;
    private CottageService cottageService;
    private ModelMapper modelMapper;

    //OBICNA REZERVACIJA SALJE FALSE ZA IS_ACTION
    @PostMapping("/{username}/{entityId}/{isAction}")
    @PreAuthorize("hasRole('COTTAGE_OWNER')")
    public ResponseEntity<Reservation> addReservation(@RequestBody ReservationDTO reservationDTO,
                                                      @PathVariable String username,
                                                      @PathVariable Long entityId,
                                                      @PathVariable Boolean isAction){

        User user = userService.loadUserByUsername(username);

        if(reservationDTO.getStartTime().isAfter(reservationDTO.getEndTime())) {
            throw new PeriodConflictException(entityId,"User have selected wrong period (start after end))");
        }

        //metoda koja proverava da li se rezervacija preklapa sa vec postojecom
        List<Reservation> reservationList =reservationService.findOneByEntityIdAndReservationType(
                entityId,reservationDTO.getReservationType(),
                reservationDTO.getStartTime(),reservationDTO.getEndTime());
        System.out.println(reservationList);
        System.out.println(reservationList.isEmpty());
        System.out.println(entityId);
        System.out.println(reservationDTO.getReservationType());
        if(!reservationList.isEmpty())
            throw new PeriodConflictException(entityId,"Conflicting period.");

        Reservation reservation = new Reservation();
        modelMapper.map(reservationDTO,reservation);

        //client
        if(!isAction){
            Client client = new Client();
            client.setId(user.getId());

            reservation.setClient(client);
        }

        //reserved entity
        if(reservationDTO.getReservationType() == ReservationType.COTTAGE){

            Cottage cottage = new Cottage();
            cottage.setId(entityId);

            reservation.setCottage(cottage);

        }else if(reservationDTO.getReservationType() == ReservationType.BOAT){

            Boat boat = new Boat();
            boat.setId(entityId);

            reservation.setBoat(boat);

        }else{

            Adventure adventure = new Adventure();
            adventure.setId(entityId);

            reservation.setAdventure(adventure);
        }

        //price
        if(reservationDTO.getReservationType() == ReservationType.COTTAGE){

            long numOfDays = ChronoUnit.DAYS.between(reservation.getStartTime(), reservation.getEndTime());
            float oneDayPrice = cottageService.findOne(entityId).getOneDayPrice();

            //number of days x price for one day stay = price for cottage
            reservation.setPrice((long) (numOfDays*oneDayPrice));

        }else if(reservationDTO.getReservationType() == ReservationType.BOAT){
            //TODO calculate price for renting boat

        }else{
            //TODO calculate price for adventure reservation
        }

        return new ResponseEntity<>(reservationService.add(reservation), HttpStatus.OK);
    }
}
