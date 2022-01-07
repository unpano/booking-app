package ftn.booking.repository;

import ftn.booking.model.Reservation;
import ftn.booking.model.enums.ReservationType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    //custom query
    @Query(value = "select * " +
            "from reservations r " +
            "where (r.cottage_id = ?1 OR r.adventure_id = ?1 OR r.boat_id = ?1) AND " +
            "r.client_id = ?2 AND " +
            "(r.reservation_type like ?3) AND " +
            "(?4 <= r.end_time) AND (r.start_time <= ?5) ", nativeQuery = true)
    List<Reservation> findAllByEntityIdAndClientIdAndReservationType(Long entityId, Long id, String reservationType,
                                                                     LocalDateTime startTime, LocalDateTime endTime);

    List<Reservation> findAllByCottageId(Long id);
}
