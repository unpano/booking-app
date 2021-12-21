package ftn.booking.repository;

import ftn.booking.model.Boat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoatRepository extends JpaRepository<Boat, Long> {

    Boat findByAddress(String address);
}

