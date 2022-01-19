package ftn.booking.repository;

import ftn.booking.model.Reservation;
import ftn.booking.model.enums.ReservationType;
import ftn.booking.utils.ChartMapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {


    @Query(value = "select * " +
            "from reservations r " +
            "where (r.reservation_type like ?1) and " +
            "(((?2  >= r.start_time) and (?2 <= r.end_time)) or " +
            "((?3  >= r.start_time) and (?3 <= r.end_time)) or " +
            "((?2  <= r.start_time) and (?3 >= r.end_time)))", nativeQuery = true)
    List<Reservation> findAllByReservationTypeAndStartTimeAndEndTime
            (String ReservationType, LocalDateTime startTime, LocalDateTime endTime);

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

    //custom query
    @Query(value = "select count(*) " +
            "from reservations r " +
            "where (?1 <= r.end_time) AND (r.start_time <= ?1) ", nativeQuery = true)
    Integer checkIfDateIsFree(LocalDateTime date);


    List<Reservation> findAllByBoatId(Long id);

    List<Reservation> findAllByBoatIdAndStartTimeAfter(Long id, LocalDateTime now);

    List<Reservation> findAllByBoatIdAndClientIdAndStartTimeAfter(Long id, Long clientId, LocalDateTime now);

    List<Reservation> findAllByBoatIdAndEndTimeBefore(Long id, LocalDateTime now);

    List<Reservation> findAllByReservationTypeAndCottageId(ReservationType cottage, Long id);

    List<Reservation> findAllByReservationTypeAndBoatId(ReservationType boat, Long id);

    //custom query
    @Query(value = "select sum(r.price) " +
            "from reservations r " +
            "where r.boat_id = ?1 AND " +
            "(?2 <= r.end_time) AND (r.start_time <= ?3)", nativeQuery = true)
    Long findBoatIncome(Long id, LocalDateTime startTime, LocalDateTime endTime);

    //custom query
    @Query(value = "select sum(r.price) " +
            "from reservations r " +
            "where r.cottage_id = ?1 AND " +
            "(?2 <= r.end_time) AND (r.start_time <= ?3)", nativeQuery = true)
    Long findCottageIncome(Long id, LocalDateTime startTime, LocalDateTime endTime);
}
