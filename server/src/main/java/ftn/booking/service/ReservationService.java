package ftn.booking.service;

import ftn.booking.model.Reservation;
import ftn.booking.model.enums.ReservationType;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ReservationService{
    Reservation add(Reservation reservation);

    List<Reservation> findAllByCottageId(Long id);

    List<Reservation> findOneByEntityIdAndReservationType(Long entityId, ReservationType reservationType, LocalDateTime startTime, LocalDateTime endTime);

    List<Reservation> findAllFutureActionsByCottageId(Long id);

    Reservation findById(Long id);

    Reservation update(Reservation reservation);
}
