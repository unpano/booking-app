package ftn.booking.service.impl;

import ftn.booking.dto.UserDTO;
import ftn.booking.model.Adventure;
import ftn.booking.model.Boat;
import ftn.booking.model.Instructor;
import ftn.booking.model.Reservation;
import ftn.booking.repository.InstructorRepository;
import ftn.booking.repository.ReservationRepository;
import ftn.booking.repository.UserRepository;
import ftn.booking.service.InstructorService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class InstructorServiceImpl implements InstructorService {

    private InstructorRepository instructorRepository;

    private UserRepository userRepository;

    private ModelMapper modelMapper;


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
    public UserDTO findInstructorByUsername(String username){
        UserDTO instructor = modelMapper.map(userRepository.findByEmail(username),UserDTO.class);
        return instructor;
    }





}
