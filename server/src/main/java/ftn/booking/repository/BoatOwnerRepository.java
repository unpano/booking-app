package ftn.booking.repository;

import ftn.booking.model.BoatOwner;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoatOwnerRepository extends JpaRepository<BoatOwner, Long> {
}
