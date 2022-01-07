package ftn.booking.service;

import ftn.booking.model.Reservation;
import java.time.LocalDateTime;
import ftn.booking.model.enums.ReservationType;

import java.util.List;

public interface ReservationService{

    Reservation add(Reservation reservation);
    List<Reservation> findAllinPeriod(LocalDateTime startDate, LocalDateTime endDate);
    List<Reservation> findOneByEntityIdAndClientIdAndReservationType(Long entityId, Long id, ReservationType reservationType, LocalDateTime startTime, LocalDateTime endTime);
}
