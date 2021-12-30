package ftn.booking.repository;

import ftn.booking.model.DeactivationRequest;
import ftn.booking.model.enums.Status;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeactivationRequestRepository extends JpaRepository<DeactivationRequest, Long> {
    DeactivationRequest findByUserIdAndStatus(Long id, Status processing);
}
