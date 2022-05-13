package ftn.booking.repository;

import ftn.booking.model.AdventureAction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdventureActionRepository extends JpaRepository<AdventureAction,Long> {
}
