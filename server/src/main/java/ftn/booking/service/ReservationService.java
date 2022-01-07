package ftn.booking.service;

import ftn.booking.model.Reservation;
import org.apache.tomcat.jni.Local;

import java.time.LocalDateTime;
import java.util.List;

public interface ReservationService{
    Reservation add(Reservation reservation);
    List<Reservation> findAllinPeriod(LocalDateTime startDate, LocalDateTime endDate);
}
