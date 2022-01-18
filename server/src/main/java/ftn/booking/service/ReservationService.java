package ftn.booking.service;

import ftn.booking.model.Reservation;
import java.time.LocalDateTime;
import ftn.booking.model.enums.ReservationType;


import java.time.LocalDate;
import java.time.LocalDateTime;

import java.util.List;
import java.util.Optional;

public interface ReservationService{

    Reservation add(Reservation reservation);
    List<Reservation> findAllinPeriod(LocalDateTime startDate, LocalDateTime endDate);
    // List<Reservation> findOneByEntityIdAndClientIdAndReservationType(Long entityId, Long id, ReservationType reservationType, LocalDateTime startTime, LocalDateTime endTime);
    List<Reservation> findAllByCottageId(Long id);

    List<Reservation> findOneByEntityIdAndReservationType(Long entityId, ReservationType reservationType, LocalDateTime startTime, LocalDateTime endTime);

    List<Reservation> findAllFutureActionsByCottageId(Long id);

    Reservation findById(Long id);

    Reservation update(Reservation reservation);

    List<Reservation> findAllPastReservationsByCottageId(Long id);

    List<Reservation> findAllFutureReservationsByCottageId(Long id);

    Boolean checkIfDateIsFree(LocalDateTime date);

    List<LocalDate> findAllForbiddenDates();

    List<Reservation> findAllByUser(Long userId);

}
