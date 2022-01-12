package ftn.booking.service.impl;

import ftn.booking.exception.NotFoundException;
import ftn.booking.model.Reservation;
import ftn.booking.model.enums.ReservationType;
import ftn.booking.repository.ReservationRepository;
import ftn.booking.service.ReservationService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class ReservationServiceImpl implements ReservationService {

    private ReservationRepository reservationRepository;


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
