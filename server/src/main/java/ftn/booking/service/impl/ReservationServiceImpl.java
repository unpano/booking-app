package ftn.booking.service.impl;

import ftn.booking.dto.ReservationDTO;
import ftn.booking.exception.NotFoundException;
import ftn.booking.model.AdditionalService;
import ftn.booking.model.Boat;
import ftn.booking.model.Reservation;
import ftn.booking.model.enums.ReservationType;
import ftn.booking.repository.AdditionalServiceRepository;
import ftn.booking.repository.ReservationRepository;
import ftn.booking.service.ReservationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class ReservationServiceImpl implements ReservationService {

    private ReservationRepository reservationRepository;
    private AdditionalServiceRepository additionalServiceRepository;

    @Override
    public Reservation addService(Long reservationId, Long serviceId)
    {
        Reservation r = reservationRepository.findById(reservationId).get();
        AdditionalService as = additionalServiceRepository.findById(serviceId).get();

        List<AdditionalService> services = r.getAdditionalServices();

        services.add(as);
        r.setAdditionalServices(services);
        r.setPrice( r.getPrice() + as.getPrice());

        return reservationRepository.save(r);
    }



    @Override
    public List<Reservation> findAllByUser(Long userId) {
        return reservationRepository.findAllByClientId(userId);
    }

    @Override
    public List<Reservation> findAllByBoat(Long boatId) {
        return reservationRepository.findAllByBoatId(boatId);
    }

    @Override
    public Boolean checkBoatReservation(ReservationDTO reservationDTO) {

        List<Reservation> allReservations = reservationRepository.findAllByBoatId(reservationDTO.getBoat().getId());


        for (Reservation res: allReservations)
        {
            if(reservationDTO.getStartTime().isEqual( res.getStartTime()) || reservationDTO.getEndTime().isEqual( res.getEndTime()))
            {
                return false;
            }
            if(reservationDTO.getStartTime().isAfter( res.getStartTime()) && reservationDTO.getStartTime().isBefore( res.getEndTime()))
            {
                return false;
            }
            if(reservationDTO.getEndTime().isAfter( res.getStartTime()) && reservationDTO.getEndTime().isBefore( res.getEndTime()))
            {
                return false;
            }
            if(reservationDTO.getStartTime().isBefore( res.getStartTime()) && reservationDTO.getEndTime().isAfter( res.getEndTime()))
            {
                return false;
            }
        }

        return true;
    }

    @Override
    public Boolean checkCottageReservation(ReservationDTO reservationDTO) {

        List<Reservation> allReservations = reservationRepository.findAllByCottageId(reservationDTO.getCottage().getId());


        for (Reservation res: allReservations)
        {
            if(reservationDTO.getStartTime().isEqual( res.getStartTime()) || reservationDTO.getEndTime().isEqual( res.getEndTime()))
            {
                return false;
            }
            if(reservationDTO.getStartTime().isAfter( res.getStartTime()) && reservationDTO.getStartTime().isBefore( res.getEndTime()))
            {
                return false;
            }
            if(reservationDTO.getEndTime().isAfter( res.getStartTime()) && reservationDTO.getEndTime().isBefore( res.getEndTime()))
            {
                return false;
            }
            if(reservationDTO.getStartTime().isBefore( res.getStartTime()) && reservationDTO.getEndTime().isAfter( res.getEndTime()))
            {
                return false;
            }
        }

        return true;
    }

    @Override
    public Boolean checkAdventureReservation(ReservationDTO reservationDTO) {

        List<Reservation> allReservations = reservationRepository.findAllByAdventureId(reservationDTO.getAdventure().getId());


        for (Reservation res: allReservations)
        {
            if(reservationDTO.getStartTime().isEqual( res.getStartTime()) || reservationDTO.getEndTime().isEqual( res.getEndTime()))
            {
                return false;
            }
            if(reservationDTO.getStartTime().isAfter( res.getStartTime()) && reservationDTO.getStartTime().isBefore( res.getEndTime()))
            {
                return false;
            }
            if(reservationDTO.getEndTime().isAfter( res.getStartTime()) && reservationDTO.getEndTime().isBefore( res.getEndTime()))
            {
                return false;
            }
            if(reservationDTO.getStartTime().isBefore( res.getStartTime()) && reservationDTO.getEndTime().isAfter( res.getEndTime()))
            {
                return false;
            }
        }

        return true;
    }


    @Override
    public void delete(Long reservationId) {

        Reservation r = reservationRepository.findById(reservationId).orElse(null);
        reservationRepository.delete(r);
    }

    @Override
    public List<Reservation> upcomingByUser(Long userId) {

        List<Reservation> all_reservations =  reservationRepository.findAllByClientId(userId);
        List<Reservation> return_reservations = new ArrayList<>();

        LocalDateTime now = LocalDateTime.now();

        for (Reservation res: all_reservations)
        {
                if(res.getStartTime().isAfter(now))
                {
                    return_reservations.add(res);
                }
        }
        return return_reservations;
    }

    @Override
    public List<Reservation> pastByUser(Long userId) {

        List<Reservation> all_reservations =  reservationRepository.findAllByClientId(userId);
        List<Reservation> return_reservations = new ArrayList<>();

        LocalDateTime now = LocalDateTime.now();

        for (Reservation res: all_reservations)
        {
            if(res.getStartTime().isBefore(now))
            {
                return_reservations.add(res);
            }
        }
        return return_reservations;
    }
    @Override
    public Reservation add(Reservation reservation) {
        return reservationRepository.save(reservation);
    }




    @Override
    public List<Reservation> findOneByEntityIdAndReservationType(Long entityId, ReservationType reservationType, LocalDateTime startTime, LocalDateTime endTime) {
        return reservationRepository.findAllByEntityIdAndReservationType(entityId, reservationType.toString(),startTime,endTime);
    }

    @Override
    public List<Reservation> findAllFutureActionsByCottageId(Long id) {
      return reservationRepository.findAllByCottageIdAndClientIdAndStartTimeAfter(id,null, LocalDateTime.now());
    }

    @Override
    public Reservation findById(Long id) {
        return reservationRepository.findById(id).orElseThrow(() -> new NotFoundException(id,"Reservation with id " + id + " does not exist."));

    }

    @Override
    public Reservation update(Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    @Override
    public List<Reservation> findAllPastReservationsByCottageId(Long id) {
        return reservationRepository.findAllByCottageIdAndEndTimeBefore(id, LocalDateTime.now());
    }

    @Override
    public List<Reservation> findAllFutureReservationsByCottageId(Long id) {
        return reservationRepository.findAllByCottageIdAndStartTimeAfter(id,LocalDateTime.now());
    }

    @Override
    public Boolean checkIfDateIsFree(LocalDateTime date) {
        return reservationRepository.checkIfDateIsFree(date) <= 0;
    }

    @Override
    public List<LocalDate> findAllForbiddenDates() {
        List<Reservation> reservations = reservationRepository.findAll();
        List<LocalDate> forbiddenDates = new ArrayList<>();

        for (Reservation res: reservations) {
            List<LocalDate> betweenDates = findAllDatesBetweenTwoDates(res.getStartTime(),res.getEndTime());
            forbiddenDates.addAll(betweenDates);
        }

        return forbiddenDates;
    }

    private List<LocalDate> findAllDatesBetweenTwoDates(LocalDateTime start, LocalDateTime end){

        List<LocalDate> totalDates = new ArrayList<>();

        while (!start.isAfter(end)) {
            totalDates.add(LocalDate.from(LocalDateTime.from(start)));
            start = start.plusDays(1);
        }

        return totalDates;
    }

    @Override
    public List<Reservation> findAllByCottageId(Long id) {
        return reservationRepository.findAllByCottageId(id);
    }
}
