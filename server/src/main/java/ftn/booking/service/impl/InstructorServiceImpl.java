package ftn.booking.service.impl;

import ftn.booking.dto.InstructorDTO;
import ftn.booking.model.*;
import ftn.booking.repository.*;
import ftn.booking.service.InstructorService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class InstructorServiceImpl implements InstructorService {

    private InstructorRepository instructorRepository;

    private UserRepository userRepository;

    private AdventureActionReportRepository adventureActionReportRepository;

    private AdventureActionClientsRepository adventureActionClientsRepository;

    private AdventureActionRepository adventureActionRepository;

    private AdventureRepository adventureRepository;

    private ModelMapper modelMapper;

    private final PasswordEncoder passwordEncoder;

    private InstructorAvailablePeriodRepository instructorAvailablePeriodRepository;


    @Override
    public List<Instructor> findAll()
    {
        return instructorRepository.findAll();
    }

    @Override
    public Instructor findOne(Long id)
    {
        return instructorRepository.findById(id).get();
    }

    @Override
    public InstructorDTO findInstructorByUsername(String username){
        InstructorDTO instructor = modelMapper.map(userRepository.findByEmail(username),InstructorDTO.class);
        return instructor;
    }

    @Override
    public Client findOneClientByEmail(String email){
        Client client = modelMapper.map(userRepository.findByEmail(email),Client.class);
        return client;
    }

    @Override
    public InstructorDTO changeInstructorInfo( InstructorDTO changedInstructor,
                                               Long instructorId){
        Instructor newInstructor = instructorRepository.findById(instructorId).get();

        newInstructor.setFirstName(changedInstructor.getFirstName());
        newInstructor.setLastName(changedInstructor.getLastName());
        newInstructor.setAddress(changedInstructor.getAddress());
        newInstructor.setCity(changedInstructor.getCity());
        newInstructor.setCountry(changedInstructor.getCountry());
        newInstructor.setPhoneNumber(changedInstructor.getPhoneNumber());


        instructorRepository.save(newInstructor);

        return modelMapper.map(newInstructor,InstructorDTO.class);

    }

    @Override
    public InstructorAvailablePeriod changePeriodOfAvailabilityInstructor(
            InstructorAvailablePeriod availablePeriod){

        List<InstructorAvailablePeriod> allPeriods = instructorAvailablePeriodRepository.findAll();
        Boolean exists = Boolean.FALSE;

        InstructorAvailablePeriod matchingPeriod = new InstructorAvailablePeriod();
        for(InstructorAvailablePeriod onePeriod: allPeriods){
            if(onePeriod.getInstructorId().equals(availablePeriod.getInstructorId())){
                exists = Boolean.TRUE;
                matchingPeriod = onePeriod;
            }
        }

        if (exists) {
            matchingPeriod.setStartTimeAvailable(availablePeriod.getStartTimeAvailable().plusHours(2L));
            matchingPeriod.setEndTimeAvailable(availablePeriod.getEndTimeAvailable().plusHours(25L).plusMinutes(59L).plusSeconds(59L));
            instructorAvailablePeriodRepository.save(matchingPeriod);
        } else {
            matchingPeriod.setInstructorId(availablePeriod.getInstructorId());
            matchingPeriod.setStartTimeAvailable(availablePeriod.getStartTimeAvailable().plusHours(2L));
            matchingPeriod.setEndTimeAvailable(availablePeriod.getEndTimeAvailable().plusHours(25L).plusMinutes(59L).plusSeconds(59L));
            instructorAvailablePeriodRepository.save(matchingPeriod);
        }

        return matchingPeriod;
    }

    @Override
    public  InstructorAvailablePeriod getPeriodOfAvailabilityInstructor(
            Long instructorId){
        List<InstructorAvailablePeriod> allPeriods = instructorAvailablePeriodRepository.findAll();
        InstructorAvailablePeriod matchingPeriod = new InstructorAvailablePeriod();

        for(InstructorAvailablePeriod onePeriod:allPeriods){
            if(onePeriod.getInstructorId().equals(instructorId)){
                matchingPeriod = onePeriod;
            }
        }

        return matchingPeriod;
    }


    @Override
    public InstructorDTO getInstructorForSpecificReport(Long reportId){
        AdventureActionReport report = adventureActionReportRepository.findById(reportId).get();
        AdventureActionClients clientReservation = adventureActionClientsRepository.findById(report.getActionReservation().getId()).get();
        AdventureAction action = adventureActionRepository.findById(clientReservation.getAction().getId()).get();
        Adventure adventure = adventureRepository.findById(action.getAdventure().getId()).get();
        Instructor instructor = instructorRepository.findById(adventure.getInstructor().getId()).get();

        return modelMapper.map(instructor,InstructorDTO.class);
    }

}
