package ftn.booking.service;

import ftn.booking.model.Reservation;
import ftn.booking.model.enums.ReservationType;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

public interface ReservationService{
    Reservation add(Reservation reservation);

    List<Reservation> findOneByEntityIdAndClientIdAndReservationType(Long entityId, Long id, ReservationType reservationType, LocalDateTime startTime, LocalDateTime endTime);
}
