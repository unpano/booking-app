package ftn.booking.service.impl;

import ftn.booking.model.Instructor;
import ftn.booking.repository.InstructorRepository;
import ftn.booking.service.InstructorService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@AllArgsConstructor
public class InstructorServiceImpl implements InstructorService {

    private InstructorRepository instructorRepository;

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
}
