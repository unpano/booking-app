package ftn.booking.repository;

import ftn.booking.model.Action;
import ftn.booking.model.AdditionalService;
import ftn.booking.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface AdditionalServiceRepository extends JpaRepository<AdditionalService, Long> {

    List<AdditionalService> findAllByBoatId(Long id);
    List<AdditionalService> findAllByCottageId(Long id);
    List<AdditionalService> findAllByAdventureId(Long id);

}


