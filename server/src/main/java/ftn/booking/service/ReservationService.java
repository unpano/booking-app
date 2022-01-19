package ftn.booking.service;

import ftn.booking.model.Reservation;
import java.time.LocalDateTime;
import ftn.booking.model.enums.ReservationType;
import ftn.booking.utils.ChartMapper;


import java.time.LocalDate;

import java.util.List;

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

    List<LocalDate> findAllForbiddenDatesCottage(Long id);

    List<Reservation> findAllByBoatId(Long id);

    List<LocalDate> findAllForbiddenDatesBoat(Long id);

    List<Reservation> findAllFutureActionsByBoatId(Long id);

    List<Reservation> findAllFutureReservationsByBoatId(Long id);

    List<Reservation> findAllPastReservationsByBoatId(Long id);

    Long findIncome(Long id, LocalDateTime startTime, LocalDateTime endTime);

    List<ChartMapper> findMonthlyBoatData(Long id);

    List<ChartMapper> findWeeklyBoatData(Long id);
}
