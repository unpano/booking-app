package ftn.booking.controller;

import ftn.booking.dto.ReservationDTO;
import ftn.booking.exception.PeriodConflictException;
import ftn.booking.model.*;
import ftn.booking.model.enums.ReservationType;
import ftn.booking.service.*;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Objects;
import ftn.booking.model.enums.ReservationType;

@RestController
@AllArgsConstructor
@RequestMapping( value = "/reservations")
public class ReservationController {

    private ReservationService reservationService;

    private UserService userService;
    private ClientService clientService;

    private ModelMapper modelMapper;
    private ReportService reportService;

    private BoatService boatService;
    private AdventureService adventureService;
    private CottageService cottageService;

    @PostMapping("/add/{reservationId}/{serviceId}")
    //@PreAuthorize("hasRole('CLIENT')")
    public  @ResponseBody ResponseEntity<Reservation> addService(@PathVariable Long reservationId, @PathVariable Long serviceId) {


        return new ResponseEntity<>( reservationService.addService(reservationId, serviceId) , HttpStatus.OK);
    }

    @GetMapping("/delete/{reservationId}")
    @PreAuthorize("hasRole('CLIENT')")
    public void deleteReservation(@PathVariable Long reservationId)
    {
        reservationService.delete(reservationId);
    }

    @GetMapping("/findByBoat/{boatId}")
    public ResponseEntity<List<Reservation>> allReservationsByBoat(@PathVariable Long boatId)
    {
        return new ResponseEntity<>(reservationService.findAllByBoat(boatId), HttpStatus.OK);
    }

    @GetMapping("/findByUser/{userId}")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<List<Reservation>> pastReservationsByUser(@PathVariable Long userId)
    {
        return new ResponseEntity<>(reservationService.pastByUser(userId), HttpStatus.OK);
    }

    @GetMapping("/upcomingByUser/{userId}")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<List<Reservation>> upcomingReservationsByUser(@PathVariable Long userId)
    {
        return new ResponseEntity<>(reservationService.upcomingByUser(userId), HttpStatus.OK);
    }



    @PostMapping("/checkBoatReservation/")
    @PreAuthorize("hasRole('CLIENT')")
    public @ResponseBody ResponseEntity<Boolean> checkReservation(@RequestBody ReservationDTO reservationDTO)
    {
        return new ResponseEntity<>(reservationService.checkBoatReservation(reservationDTO), HttpStatus.OK);
    }

    @PostMapping("/checkCottageReservation/")
    @PreAuthorize("hasRole('CLIENT')")
    public @ResponseBody ResponseEntity<Boolean> checkCottageReservation(@RequestBody ReservationDTO reservationDTO)
    {
        return new ResponseEntity<>(reservationService.checkCottageReservation(reservationDTO), HttpStatus.OK);
    }

    @PostMapping("/checkAdventureReservation/")
    @PreAuthorize("hasRole('CLIENT')")
    public @ResponseBody ResponseEntity<Boolean> checkAdventureReservation(@RequestBody ReservationDTO reservationDTO)
    {
        return new ResponseEntity<>(reservationService.checkAdventureReservation(reservationDTO), HttpStatus.OK);
    }

    @PostMapping("/createReservation/")
    @PreAuthorize("hasRole('CLIENT')")
    public  @ResponseBody ResponseEntity<Reservation> makeReservation(@RequestBody ReservationDTO reservationDTO) {

        Reservation new_reservation = new Reservation();

        if(reservationDTO.getReservationType() == ReservationType.BOAT)
        {
            new_reservation.setReservationType(ReservationType.BOAT);
            new_reservation.setBoat(reservationDTO.getBoat());
        }
        else if (reservationDTO.getReservationType() == ReservationType.COTTAGE)
        {
            new_reservation.setReservationType(ReservationType.COTTAGE);
            new_reservation.setCottage(reservationDTO.getCottage());
        }
        else if(new_reservation.getReservationType() == ReservationType.ADVENTURE)
        {
            new_reservation.setReservationType(ReservationType.ADVENTURE);
            new_reservation.setAdventure(reservationDTO.getAdventure());

        }

        new_reservation.setClient( reservationDTO.getClient());


        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

        reservationDTO.getStartTime().format(formatter);
        reservationDTO.getEndTime().format(formatter);

        new_reservation.setStartTime(reservationDTO.getStartTime());
        new_reservation.setEndTime(reservationDTO.getEndTime());


        int numOfDays = reservationDTO.getEndTime().getDayOfYear() - reservationDTO.getStartTime().getDayOfYear();
        Long price = reservationDTO.getPrice() * numOfDays;

        new_reservation.setPrice(price);



        return new ResponseEntity<>(reservationService.add(new_reservation), HttpStatus.OK);
    }



    @GetMapping("/{id}/isReported")
    @PreAuthorize("hasRole('COTTAGE_OWNER')")
    public Boolean isReservationReported(@PathVariable Long id) {
        return reportService.isReservationReported(id);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('COTTAGE_OWNER')")
    public ResponseEntity<List<Reservation>> findAllCottageActions(@PathVariable Long id){
        return new ResponseEntity<>(reservationService.findAllFutureActionsByCottageId(id), HttpStatus.OK);
    }

    @GetMapping("/{id}/past-reservations")
    @PreAuthorize("hasRole('COTTAGE_OWNER')")
    public ResponseEntity<List<Reservation>> findAllCottagePastReservations(@PathVariable Long id){
        return new ResponseEntity<>(reservationService.findAllPastReservationsByCottageId(id), HttpStatus.OK);
    }

    @GetMapping("/{id}/future-reservations")
    @PreAuthorize("hasRole('COTTAGE_OWNER')")
    public ResponseEntity<List<Reservation>> findAllCottageFutureReservations(@PathVariable Long id){
        return new ResponseEntity<>(reservationService.findAllFutureReservationsByCottageId(id), HttpStatus.OK);
    }

    @GetMapping("/isDateFree")
    @PreAuthorize("hasRole('COTTAGE_OWNER')")
    public ResponseEntity<Boolean> checkIfDateIsFree(@RequestParam String date){

        date = date.replace('T',' ');
        date = date.substring(0, date.indexOf("."));
        //System.out.println(date);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        LocalDateTime dateTime = LocalDateTime.parse(date, formatter);
        ///System.out.println(dateTime);
        return new ResponseEntity<>(reservationService.checkIfDateIsFree(dateTime), HttpStatus.OK);
    }

    @GetMapping("/forbiddenDates")
    @PreAuthorize("hasRole('COTTAGE_OWNER')")
    public ResponseEntity<List<LocalDate>> findAllForbiddenDates(){

        return new ResponseEntity<>(reservationService.findAllForbiddenDates(), HttpStatus.OK);
    }

    @PutMapping("/{id}/{username}")
    @PreAuthorize("hasRole('COTTAGE_OWNER')")
    public ResponseEntity<Reservation> reserveActionForClient(@PathVariable Long id,
                                                              @PathVariable String username) {

        Reservation reservation = reservationService.findById(id);

        User user = userService.loadUserByUsername(username);
        Client client = new Client();
        client.setId(user.getId());

        reservation.setClient(client);

        return new ResponseEntity<>(reservationService.update(reservation), HttpStatus.OK);
    }






    //OBICNA REZERVACIJA SALJE FALSE ZA IS_ACTION
    @PostMapping("/{username}/{entityId}/{isAction}/{actionPrice}")
    @PreAuthorize("hasRole('COTTAGE_OWNER')")
    public ResponseEntity<Reservation> addReservation(@RequestBody ReservationDTO reservationDTO,
                                                      @PathVariable String username,
                                                      @PathVariable Long entityId,
                                                      @PathVariable Boolean isAction,
                                                      @PathVariable String actionPrice){

        User user = userService.loadUserByUsername(username);

        if(reservationDTO.getStartTime().isAfter(reservationDTO.getEndTime())) {
            throw new PeriodConflictException(entityId,"User have selected wrong period (start after end))");
        }

        //metoda koja proverava da li se rezervacija preklapa sa vec postojecom
        List<Reservation> reservationList =reservationService.findOneByEntityIdAndReservationType(
                entityId,reservationDTO.getReservationType(),
                reservationDTO.getStartTime(),reservationDTO.getEndTime());

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
            if(Objects.equals(actionPrice, "undefined"))
                reservation.setPrice((long) (numOfDays*oneDayPrice));
            else
                reservation.setPrice(numOfDays*Long.parseLong(actionPrice));

        }else if(reservationDTO.getReservationType() == ReservationType.BOAT){
            //TODO calculate price for renting boat

        }else{
            //TODO calculate price for adventure reservation
        }

        return new ResponseEntity<>(reservationService.add(reservation), HttpStatus.OK);
    }




}
