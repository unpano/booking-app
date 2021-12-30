package ftn.booking.repository;

import ftn.booking.model.Cottage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CottageRepository extends JpaRepository<Cottage, Long> {
    List<Cottage> findAllByCottageOwnerId(Long id);
}
