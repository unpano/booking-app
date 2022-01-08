package ftn.booking.service.impl;

import ftn.booking.exception.NotFoundException;
import ftn.booking.model.Reservation;
import ftn.booking.model.enums.ReservationType;
import ftn.booking.repository.ReservationRepository;
import ftn.booking.service.ReservationService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

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
    public List<Reservation> findAllByCottageId(Long id) {
        return reservationRepository.findAllByCottageId(id);
    }
}
