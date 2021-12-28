package ftn.booking.service.impl;

import ftn.booking.model.BoatOwner;
import ftn.booking.model.CottageOwner;
import ftn.booking.model.Instructor;
import ftn.booking.repository.BoatOwnerRepository;
import ftn.booking.repository.CottageOwnerRepository;
import ftn.booking.repository.InstructorRepository;
import ftn.booking.service.OwnerService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class OwnerServiceImpl implements OwnerService {

    private BoatOwnerRepository boatOwnerRepository;
    private CottageOwnerRepository cottageOwnerRepository;
    private InstructorRepository instructorRepository;

    @Override
    public BoatOwner addBoatOwner(BoatOwner boatOwner) {
        return boatOwnerRepository.save(boatOwner);
    }

    @Override
    public CottageOwner addCottageOwner(CottageOwner cottageOwner) {
        return cottageOwnerRepository.save(cottageOwner);
    }

    @Override
    public Instructor addInstructor(Instructor instructor) {
        return instructorRepository.save(instructor);
    }
}
