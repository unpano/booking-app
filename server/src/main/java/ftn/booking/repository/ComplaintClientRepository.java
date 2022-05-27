package ftn.booking.repository;

import ftn.booking.model.ComplaintClient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ComplaintClientRepository extends JpaRepository<ComplaintClient,Long> {
}
