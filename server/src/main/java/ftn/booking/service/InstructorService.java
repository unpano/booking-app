package ftn.booking.service;
import ftn.booking.dto.InstructorDTO;
import ftn.booking.dto.UserDTO;
import ftn.booking.model.Adventure;
import ftn.booking.model.Instructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface InstructorService {

    List<Instructor> findAll();
    Instructor findOne(Long id);

    InstructorDTO findInstructorByUsername(String username);

    InstructorDTO changeInstructorInfo( InstructorDTO changedInstructor,
                                     Long instructorId);


}
