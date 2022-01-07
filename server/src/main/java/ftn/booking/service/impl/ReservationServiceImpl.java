package ftn.booking.service.impl;

import ftn.booking.model.Reservation;
import ftn.booking.model.enums.ReservationType;
import ftn.booking.repository.ReservationRepository;
import ftn.booking.service.ReservationService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

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
        List<Reservation> reservations = reservationRepository.findAllByCottageIdAndClientId(id,null);

        reservations.removeIf(res -> res.getStartTime().isBefore(LocalDateTime.now()));

        return reservations;
    }

    @Override
    public List<Reservation> findAllByCottageId(Long id) {
        return reservationRepository.findAllByCottageId(id);
    }
}
