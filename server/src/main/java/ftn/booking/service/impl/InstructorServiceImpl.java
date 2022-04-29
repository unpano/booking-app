package ftn.booking.service.impl;

import ftn.booking.model.Adventure;
import ftn.booking.model.Boat;
import ftn.booking.model.Instructor;
import ftn.booking.model.Reservation;
import ftn.booking.repository.InstructorRepository;
import ftn.booking.repository.ReservationRepository;
import ftn.booking.service.InstructorService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
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
