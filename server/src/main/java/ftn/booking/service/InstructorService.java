package ftn.booking.service;
import ftn.booking.dto.UserDTO;
import ftn.booking.model.Adventure;
import ftn.booking.model.Instructor;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

public interface InstructorService {

    List<Instructor> findAll();
    Instructor findOne(Long id);

    UserDTO findInstructorByUsername(String username);

}
