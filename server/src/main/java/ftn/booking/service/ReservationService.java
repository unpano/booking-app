package ftn.booking.service;

import ftn.booking.model.Reservation;
import ftn.booking.model.enums.ReservationType;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

public interface ReservationService{
    Reservation add(Reservation reservation);

    List<Reservation> findAllByCottageId(Long id);

    List<Reservation> findOneByEntityIdAndReservationType(Long entityId, ReservationType reservationType, LocalDateTime startTime, LocalDateTime endTime);

    List<Reservation> findAllFutureActionsByCottageId(Long id);
}
