package ftn.booking.service.impl;

import ftn.booking.dto.InstructorDTO;
import ftn.booking.model.Instructor;
import ftn.booking.model.User;
import ftn.booking.repository.InstructorRepository;
import ftn.booking.repository.UserRepository;
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

    private ModelMapper modelMapper;

    private final PasswordEncoder passwordEncoder;


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
    public InstructorDTO changeInstructorInfo( InstructorDTO changedInstructor,
                                               Long instructorId){
        InstructorDTO newInstructor = modelMapper.map(instructorRepository.findById(instructorId).get(),InstructorDTO.class);

        newInstructor.setFirstName(changedInstructor.getFirstName());
        newInstructor.setLastName(changedInstructor.getLastName());
        newInstructor.setAddress(changedInstructor.getAddress());
        newInstructor.setCity(changedInstructor.getCity());
        newInstructor.setCountry(changedInstructor.getCountry());
        newInstructor.setPhoneNumber(changedInstructor.getPhoneNumber());

        instructorRepository.save(modelMapper.map(newInstructor,Instructor.class));

        return newInstructor;

    }

    @Override
    public Boolean checkIfNewPasswordSameOld(Long instructorId,
                                             String newPassword){
        User instructor = userRepository.findById(instructorId).get();

        passwordEncoder.encode(newPassword);
        return passwordEncoder.matches(instructor.getPassword(),newPassword);
    }




}
