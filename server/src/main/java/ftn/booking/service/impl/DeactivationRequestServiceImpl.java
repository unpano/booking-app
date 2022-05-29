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

import java.util.ArrayList;
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
            if(request.getUserId().equals(requestDTO.getUserId())){
                exists = Boolean.TRUE;
            }
        }

        if(exists.equals(Boolean.FALSE)) {
            DeactivationRequest newRequest = new DeactivationRequest();


            User user = userRepository.findById(requestDTO.getUserId()).get();
            user.setHasDeactivationRequest(Boolean.TRUE);
            userRepository.save(user);

            newRequest.setUserId(user.getId());
            newRequest.setDescription(requestDTO.getDescription());
            newRequest.setStatus(Status.PROCESSING);
            newRequest.setFirstNameUser(user.getFirstName());
            newRequest.setLastNameUser(user.getLastName());
            newRequest.setEmailUser(user.getEmail());
            newRequest.setRoleUser(user.getRole().toString());
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
            if(oneRequest.getUserId().equals(userId)){
                matchingRequest = oneRequest;
                break;
            }
        }

        DeactivationRequestDTO matchingRequestDTO = new DeactivationRequestDTO();
        matchingRequestDTO.setUserId(matchingRequest.getUserId());
        matchingRequestDTO.setId(matchingRequest.getId());
        matchingRequestDTO.setDescription(matchingRequest.getDescription());
        matchingRequestDTO.setStatus(matchingRequest.getStatus().toString());
        matchingRequestDTO.setFirstNameUser(matchingRequest.getFirstNameUser());
        matchingRequestDTO.setLastNameUser(matchingRequest.getLastNameUser());
        matchingRequestDTO.setEmailUser(matchingRequest.getEmailUser());
        matchingRequestDTO.setRoleUser(matchingRequest.getRoleUser());

        return matchingRequestDTO;
    }

    @Override
    public List<DeactivationRequestDTO> getAllDeactivationRequests(){
        List<DeactivationRequest> allRequests = deactivationRequestRepository.findAll();
        List<DeactivationRequestDTO> allRequestsDTO = new ArrayList<>();

        for(DeactivationRequest oneRequest:allRequests){
            DeactivationRequestDTO requestDTO = new DeactivationRequestDTO();
            requestDTO.setStatus(oneRequest.getStatus().toString());
            requestDTO.setId(oneRequest.getId());
            requestDTO.setDescription(oneRequest.getDescription());
            requestDTO.setUserId(oneRequest.getUserId());
            requestDTO.setFirstNameUser(oneRequest.getFirstNameUser());
            requestDTO.setLastNameUser(oneRequest.getLastNameUser());
            requestDTO.setEmailUser(oneRequest.getEmailUser());
            requestDTO.setRoleUser(oneRequest.getRoleUser());

            allRequestsDTO.add(requestDTO);
        }

        return allRequestsDTO;
    }

    @Override
    public Boolean approveRequestForDeletingAccount(Long userId){
        DeactivationRequest request = deactivationRequestRepository.findByUserId(userId);
        request.setStatus(Status.APPROVED);
        deactivationRequestRepository.save(request);

        return Boolean.TRUE;
    }

}
