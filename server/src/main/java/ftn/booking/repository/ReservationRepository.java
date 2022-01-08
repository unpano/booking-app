package ftn.booking.repository;

import ftn.booking.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    //custom query
    @Query(value = "select * " +
            "from reservations r " +
            "where (r.cottage_id = ?1 OR r.adventure_id = ?1 OR r.boat_id = ?1) AND " +
            "(r.reservation_type like ?2) AND " +
            "(?3 <= r.end_time) AND (r.start_time <= ?4) ", nativeQuery = true)
    List<Reservation> findAllByEntityIdAndReservationType(Long entityId, String reservationType,
                                                                     LocalDateTime startTime, LocalDateTime endTime);

    List<Reservation> findAllByCottageId(Long id);

    List<Reservation> findAllByCottageIdAndClientIdAndStartTimeAfter(Long id, Long clientId, LocalDateTime now);

    List<Reservation> findAllByCottageIdAndEndTimeBefore(Long id, LocalDateTime now);

    List<Reservation> findAllByCottageIdAndStartTimeAfter(Long id, LocalDateTime now);
}
