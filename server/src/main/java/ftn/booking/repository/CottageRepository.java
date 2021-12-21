package ftn.booking.repository;

import ftn.booking.model.Cottage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CottageRepository extends JpaRepository<Cottage, Long> {
}
