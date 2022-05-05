package ftn.booking.repository;

import ftn.booking.model.AdventureReservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdventureReservationRepository extends JpaRepository<AdventureReservation,Long> {
}
