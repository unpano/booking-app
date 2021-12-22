package ftn.booking.service.impl;

import ftn.booking.model.Instructor;
import ftn.booking.repository.InstructorRepository;
import ftn.booking.service.InstructorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InstructorServiceImpl implements InstructorService {

    @Autowired
    private InstructorRepository instructorRepository;

    @Override
    public List<Instructor> findAll()
    {
        return instructorRepository.findAll();
    }
}
