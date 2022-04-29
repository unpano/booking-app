package ftn.booking.service;
import ftn.booking.model.Adventure;
import ftn.booking.model.Instructor;
import java.util.List;

public interface InstructorService {

    List<Instructor> findAll();
    Instructor findOne(Long id);


}
