package ftn.booking.service.impl;

import ftn.booking.dto.DeactivationRequestDTO;
import ftn.booking.model.DeactivationRequest;
import ftn.booking.model.User;
import ftn.booking.model.enums.Status;
import ftn.booking.repository.DeactivationRequestRepository;
import ftn.booking.repository.UserRepository;
import ftn.booking.service.DeactivationRequestService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class DeactivationRequestServiceImpl implements DeactivationRequestService {

    private DeactivationRequestRepository deactivationRequestRepository;

    private UserRepository userRepository;

    private ModelMapper modelMapper;


    @Override
    public DeactivationRequest add(DeactivationRequest request) {
        return deactivationRequestRepository.save(request);
    }

    @Override
    public DeactivationRequest findByUserIdAndStatus(Long id, Status processing) {
        return deactivationRequestRepository.findByUserIdAndStatus(id,processing);
    }

    @Override
    public DeactivationRequestDTO createNewDeactivationRequest(DeactivationRequestDTO requestDTO){
        List<DeactivationRequest> allRequests = deactivationRequestRepository.findAll();
        Boolean exists = Boolean.FALSE;
        for(DeactivationRequest request:allRequests){
            if(request.getUser().getId().equals(requestDTO.getUserId())){
                exists = Boolean.TRUE;
            }
        }

        if(exists.equals(Boolean.FALSE)) {
            DeactivationRequest newRequest = new DeactivationRequest();


            User user = userRepository.findById(requestDTO.getUserId()).get();
            user.setHasDeactivationRequest(Boolean.TRUE);
            userRepository.save(user);

            newRequest.setUser(user);
            newRequest.setDescription(requestDTO.getDescription());
            newRequest.setStatus(Status.PROCESSING);
            return modelMapper.map(deactivationRequestRepository.save(newRequest), DeactivationRequestDTO.class);
        } else {
            DeactivationRequestDTO emptyRequestDTO = new DeactivationRequestDTO();
            return emptyRequestDTO;
        }


    }

    @Override
    public DeactivationRequestDTO getDeactivationRequestByUserId(Long userId){
        List<DeactivationRequest> allRequests = deactivationRequestRepository.findAll();
        DeactivationRequest matchingRequest = new DeactivationRequest();

        for(DeactivationRequest oneRequest:allRequests){
            if(oneRequest.getUser().getId().equals(userId)){
                matchingRequest = oneRequest;
                break;
            }
        }

        DeactivationRequestDTO matchingRequestDTO = new DeactivationRequestDTO();
        matchingRequestDTO.setUserId(matchingRequest.getUser().getId());
        matchingRequestDTO.setId(matchingRequest.getId());
        matchingRequestDTO.setDescription(matchingRequest.getDescription());
        matchingRequestDTO.setStatus(matchingRequest.getStatus().toString());

        return matchingRequestDTO;
    }

}
