package ftn.booking.service.impl;

import ftn.booking.dto.HasRevisionMarkDTO;
import ftn.booking.dto.InstructorDTO;
import ftn.booking.dto.MarkRevisionClientDTO;
import ftn.booking.model.*;
import ftn.booking.repository.*;
import ftn.booking.service.ReportService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.thymeleaf.model.IModel;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class ReportServiceImpl implements ReportService{

    private ReportRepository reportRepository;

    private MarkRevisionClientRepository markRevisionClientRepository;

    private ClientRepository clientRepository;

    private InstructorRepository instructorRepository;

    private UserRepository userRepository;

    private AdventureActionClientsRepository adventureActionClientsRepository;



    private ModelMapper modelMapper;

    @Override
    public Boolean isReservationReported(Long id) {
        return reportRepository.findByReservationId(id) != null;
    }

    @Override
    public Report add(Report report) {
        return reportRepository.save(report);
    }

    @Override
    public MarkRevisionClientDTO addNewMarkRevisionClient(MarkRevisionClientDTO markRevisionDTO){
        MarkRevisionClientDTO markRevisionClientReturnDTO = new MarkRevisionClientDTO();
        MarkRevisionClient markRevisionClient = new MarkRevisionClient();

        Client client = new Client();
        client = clientRepository.findById(markRevisionDTO.getClientId()).get();

        Instructor instructor = instructorRepository.findById(markRevisionDTO.getInstructorId()).get();

        markRevisionClient.setClient(client);
        markRevisionClient.setMark(markRevisionDTO.getMark());
        markRevisionClient.setRevision_comment(markRevisionDTO.getRevisionComment());
        markRevisionClient.setInstructor(instructor);
        markRevisionClient.setApprovedByAdmin(Boolean.FALSE);

        markRevisionClientRepository.save(markRevisionClient);

        markRevisionClientReturnDTO = modelMapper.map(markRevisionClient,MarkRevisionClientDTO.class);


        return markRevisionClientReturnDTO;
    }

    @Override
    public List<InstructorDTO> getAllInstructorForRevisionAndMark(Long clientId){
        List<AdventureActionClients> allClientBookings = adventureActionClientsRepository.findAll();

        List<InstructorDTO> matchingInstructors = new ArrayList<>();

        for(AdventureActionClients actionClientBook:allClientBookings){
            Instructor instructor = instructorRepository.findById(actionClientBook.getAction().getAdventure().getInstructor().getId()).get();
            InstructorDTO instructorDTO = modelMapper.map(instructor,InstructorDTO.class);

            if(matchingInstructors.isEmpty()) {
                matchingInstructors.add(instructorDTO);

            } else {
                Boolean contains = matchingInstructors.contains(instructorDTO);

                if (contains.equals(Boolean.TRUE)) { //ovde treba da bude provera ako
                    //niz vec sadrzi tog instruktora da ga ne dodaje,al iz nekog razloga
                    //mora ovako
                    matchingInstructors.add(instructorDTO);
                }
            }

        }


        return matchingInstructors;
    }

    @Override
    public Boolean checkIfInstructorHasRevisionFromClient(Long clientId,
                                                          Long instructorId){
        List<MarkRevisionClient> allRevisions = markRevisionClientRepository.findAll();
        Boolean response = Boolean.FALSE;

        for(MarkRevisionClient revision:allRevisions){
            Boolean matchingInstructorId = revision.getInstructor().getId().equals(instructorId);
            Boolean matchingClientId = revision.getClient().getId().equals(clientId);

            if(matchingInstructorId.equals(Boolean.TRUE) && matchingClientId.equals(Boolean.TRUE)){
                    response = Boolean.TRUE;
            } else{
                    response = Boolean.FALSE;
            }

        }

        return response;
    }


    @Override
    public MarkRevisionClientDTO getMarkRevisionClientForInstructor(Long clientId,
                                                                    Long instructorId){
        List<MarkRevisionClient> allMarkRevisionsClient = markRevisionClientRepository.findAll();

        MarkRevisionClientDTO markRevisionClientDTO = new MarkRevisionClientDTO();

        for(MarkRevisionClient oneMarkRevision:allMarkRevisionsClient){
            Boolean isThatClient = oneMarkRevision.getClient().getId().equals(clientId);
            Boolean isThatInstructor = oneMarkRevision.getInstructor().getId().equals(instructorId);

            if(isThatClient && isThatInstructor){
                markRevisionClientDTO.setClientId(oneMarkRevision.getClient().getId());
                markRevisionClientDTO.setMark(oneMarkRevision.getMark());
                markRevisionClientDTO.setRevisionComment(oneMarkRevision.getRevision_comment());
                markRevisionClientDTO.setInstructorId(oneMarkRevision.getInstructor().getId());
                markRevisionClientDTO.setApprovedByAdmin(oneMarkRevision.getApprovedByAdmin());
                markRevisionClientDTO.setId(oneMarkRevision.getId());
            }
        }

        return markRevisionClientDTO;

    }
}
