package ftn.booking.service;
import ftn.booking.dto.IncomeReservationDTO;
import ftn.booking.dto.InstructorDTO;
import ftn.booking.dto.UserDTO;
import ftn.booking.model.Adventure;
import ftn.booking.model.Client;
import ftn.booking.model.Instructor;
import ftn.booking.model.InstructorAvailablePeriod;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface InstructorService {

    List<Instructor> findAll();
    Instructor findOne(Long id);

    InstructorDTO findInstructorByUsername(String username);

    Client findOneClientByEmail(String email);

    InstructorDTO changeInstructorInfo( InstructorDTO changedInstructor,
                                     Long instructorId);

    InstructorAvailablePeriod changePeriodOfAvailabilityInstructor(
            InstructorAvailablePeriod availablePeriod);

    InstructorAvailablePeriod getPeriodOfAvailabilityInstructor(
            Long instructorId);

    InstructorDTO getInstructorForSpecificReport(Long reportId);

    List<InstructorDTO> getAllInstructorsForAdmin();

    Boolean deleteInstructor(Long instructorId);

    Double getAverageMarkForInstructor(Long instructorId);

    List<IncomeReservationDTO> getAllIncomesForInstructor( Long instructorId);

    Double getIncomeSumForInstructor(Long instructorId);
}
