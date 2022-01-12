package ftn.booking.service;

import ftn.booking.model.DeactivationRequest;
import ftn.booking.model.enums.Status;

public interface DeactivationRequestService {
    DeactivationRequest add(DeactivationRequest request);
    DeactivationRequest findByUserIdAndStatus(Long id, Status processing);
}
