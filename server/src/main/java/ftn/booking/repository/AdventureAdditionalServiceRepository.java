package ftn.booking.repository;

import ftn.booking.model.AdventureAdditionalService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdventureAdditionalServiceRepository extends JpaRepository<AdventureAdditionalService,Long> {
}
