package ftn.booking.service.impl;

import ftn.booking.model.DeactivationRequest;
import ftn.booking.model.enums.Status;
import ftn.booking.repository.DeactivationRequestRepository;
import ftn.booking.service.DeactivationRequestService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class DeactivationRequestServiceImpl implements DeactivationRequestService {

    private DeactivationRequestRepository deactivationRequestRepository;


    @Override
    public DeactivationRequest add(DeactivationRequest request) {
        return deactivationRequestRepository.save(request);
    }

    @Override
    public DeactivationRequest findByUserIdAndStatus(Long id, Status processing) {
        return deactivationRequestRepository.findByUserIdAndStatus(id,processing);
    }


}
