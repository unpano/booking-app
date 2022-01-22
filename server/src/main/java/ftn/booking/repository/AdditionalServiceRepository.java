package ftn.booking.repository;

import ftn.booking.model.AdditionalService;
import ftn.booking.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface AdditionalServiceRepository extends JpaRepository<AdditionalService, Long> {

    @Query(value = "SELECT * " +
            "FROM additional_services ads INNER JOIN boat_service bs ON ads.id = bs.service_id" +
            " WHERE (bs.boat_id LIKE ?1)", nativeQuery = true)
    List<AdditionalService> findAllByBoatId
            (Long boatId);

    @Query(value = "SELECT * " +
            "FROM additional_services ads INNER JOIN cottage_additional_services bs ON ads.id = bs.additional_services" +
            " WHERE (bs.cottage_id LIKE ?1)", nativeQuery = true)
    List<AdditionalService> findAllByCottageId
            (Long cottageId);



}


