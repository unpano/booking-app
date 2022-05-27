package ftn.booking.service;

import ftn.booking.dto.DeactivationRequestDTO;
import ftn.booking.model.DeactivationRequest;
import ftn.booking.model.enums.Status;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

public interface DeactivationRequestService {
    DeactivationRequest add(DeactivationRequest request);
    DeactivationRequest findByUserIdAndStatus(Long id, Status processing);

    DeactivationRequestDTO createNewDeactivationRequest(DeactivationRequestDTO requestDTO);

    DeactivationRequestDTO getDeactivationRequestByUserId(Long userId);
}
