package ftn.booking.service.impl;

import ftn.booking.dto.IncomeReservationDTO;
import ftn.booking.dto.InstructorDTO;
import ftn.booking.model.*;
import ftn.booking.model.enums.Role;
import ftn.booking.repository.*;
import ftn.booking.service.InstructorService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

    private MarkRevisionClientRepository markRevisionClientRepository;

    private IncomeReservationRepository incomeReservationRepository;
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

    @Override
    public List<InstructorDTO> getAllInstructorsForAdmin(){
        List<Instructor> allInstructors = instructorRepository.findAll();
        List<InstructorDTO> allInstructorsDTO = new ArrayList<>();

        List<Adventure> allAdventures = adventureRepository.findAll();

        for(Instructor instructor:allInstructors){
            List<Adventure> allAdventuresByInstructor = new ArrayList<>();

            for(Adventure adventure:allAdventures){
                if(adventure.getInstructor().getId().equals(instructor.getId())){
                    allAdventuresByInstructor.add(adventure);
                }
            }

            if(allAdventuresByInstructor.isEmpty()){
                InstructorDTO instructorDTO = new InstructorDTO();
                instructorDTO = modelMapper.map(instructor,InstructorDTO.class);
                instructorDTO.setCanBeDeleted(Boolean.TRUE);
                instructorDTO.setUserType(Role.ROLE_INSTRUCTOR);
                allInstructorsDTO.add(instructorDTO);

            } else{
                InstructorDTO instructorDTO = new InstructorDTO();
                instructorDTO = modelMapper.map(instructor,InstructorDTO.class);
                instructorDTO.setCanBeDeleted(Boolean.FALSE);
                instructorDTO.setUserType(Role.ROLE_INSTRUCTOR);
                allInstructorsDTO.add(instructorDTO);

            }

        }

        return allInstructorsDTO;
    }

    @Override
    public Boolean deleteInstructor(Long instructorId){
        User instructor = userRepository.findById(instructorId).get();
        userRepository.delete(instructor);
        return Boolean.TRUE;
    }

    @Override
    public Double getAverageMarkForInstructor(Long instructorId){
        List<MarkRevisionClient> allRevisions = markRevisionClientRepository.findAll();
        Double averageMark = 0.0;
        Integer divider = 0;
        for(MarkRevisionClient oneRevision:allRevisions){
            if(oneRevision.getInstructor().getId().equals(instructorId)){
                divider += 1;
                averageMark += oneRevision.getMark();
                averageMark = averageMark/divider;
            }
        }

        return averageMark;
    }

    @Override
    public List<IncomeReservationDTO> getAllIncomesForInstructor(Long instructorId){
        List<IncomeReservationDTO> allIncomesDTO = new ArrayList<>();
        List<IncomeReservation> allIncomes = incomeReservationRepository.findAll();

        for(IncomeReservation income:allIncomes){
            if(income.getAction().getAdventure().getInstructor().getId().equals(instructorId)){
                IncomeReservationDTO incomeDTO= new IncomeReservationDTO();
                incomeDTO.setId(income.getId());
                incomeDTO.setIncomeInEuros(income.getIncomeInEuros());
                incomeDTO.setEndTimeOfBooking(income.getAction().getEndTime());
                incomeDTO.setStartTimeOfBooking(income.getAction().getStartTime());
                incomeDTO.setClientId(income.getClient().getId());
                incomeDTO.setActionId(income.getAction().getId());

                allIncomesDTO.add(incomeDTO);
            }
        }

        return allIncomesDTO;

    }

    @Override
    public Double getIncomeSumForInstructor(Long instructorId){
        List<IncomeReservation> allIncomes = incomeReservationRepository.findAll();
        Double sum = 0.0;
        for(IncomeReservation income:allIncomes){
            if(income.getAction().getAdventure().getInstructor().getId().equals(instructorId)){
                sum += income.getIncomeInEuros();
            }
        }

        return sum;

    }

}
