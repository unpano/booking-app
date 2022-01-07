package ftn.booking.service.impl;

import ftn.booking.model.Reservation;
import ftn.booking.repository.ReservationRepository;
import ftn.booking.service.ReservationService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
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
    public List<Reservation> findAllinPeriod(LocalDateTime startDate, LocalDateTime endDate) {
        return reservationRepository.findAllByReservationTypeAndStartTimeAndEndTime("BOAT", startDate, endDate);
    }
}
