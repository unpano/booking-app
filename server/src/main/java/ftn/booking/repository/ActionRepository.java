package ftn.booking.repository;

import ftn.booking.model.Action;
import ftn.booking.model.Adventure;
import ftn.booking.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;


public interface ActionRepository extends JpaRepository<Action, Long> {


    List<Action> findAllActionsByBoatId(Long id);
    List<Action> findAllActionsByCottageId(Long id);
    List<Action> findAllActionsByAdventureId(Long id);
}
