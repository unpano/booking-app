package ftn.booking.repository;

import ftn.booking.model.DeactivationRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeactivationRequestRepository extends JpaRepository<DeactivationRequest, Long> {

    DeactivationRequest findByUserId(Long id);
}
