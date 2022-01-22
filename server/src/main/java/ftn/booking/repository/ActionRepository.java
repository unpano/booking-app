package ftn.booking.repository;

import ftn.booking.model.Action;
import ftn.booking.model.Adventure;
import ftn.booking.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;


public interface ActionRepository extends JpaRepository<Action, Long> {


    List<Action> findAllActionsByBoatIdAndTaken(Long id, Boolean taken);
    List<Action> findAllActionsByCottageId(Long id);
    List<Action> findAllActionsByAdventureIdAndTaken(Long id, Boolean taken);
}
