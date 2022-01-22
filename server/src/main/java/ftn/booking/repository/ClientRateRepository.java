package ftn.booking.repository;

import ftn.booking.model.ClientRate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRateRepository extends JpaRepository<ClientRate, Long> {
}
