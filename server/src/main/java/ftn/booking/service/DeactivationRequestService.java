package ftn.booking.service;

import ftn.booking.model.DeactivationRequest;

public interface DeactivationRequestService {
    DeactivationRequest add(DeactivationRequest request);

    DeactivationRequest findByUserId(Long id);
}
