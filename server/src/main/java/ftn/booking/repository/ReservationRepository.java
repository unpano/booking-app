package ftn.booking.repository;

import ftn.booking.model.Boat;
import ftn.booking.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    @Query(value = "select * from reservations r where " +
            "((r.reservation_type like ?1) and " +
            "(?2  >= r.start_time) and (?2 <= r.end_time) or " +
            "(?3  >= r.start_time) and (?3 <= r.end_time) or " +
            "(?2  <= r.start_time) and (?3 >= r.end_time))", nativeQuery = true)
    List<Reservation> findAllByReservationTypeAndStartTimeAndEndTime
            (String ReservationType, LocalDateTime startTime, LocalDateTime endTime);
}
