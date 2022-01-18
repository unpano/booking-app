package ftn.booking.repository;

import ftn.booking.model.Action;
import ftn.booking.model.Adventure;
import ftn.booking.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;


public interface ActionRepository extends JpaRepository<Action, Long> {

    @Query(value = "select * " +
            "from action a " +
            "where (a.boat_id like ?1) or (a.cottage_id like ?1) or (a.adventure_id like ?1)", nativeQuery = true)
    List<Action> findAllActionsByEntityId(Long id);
}
