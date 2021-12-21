package ftn.booking.service.impl;

import ftn.booking.model.Boat;
import ftn.booking.repository.BoatRepository;
import ftn.booking.service.BoatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoatServiceImpl implements BoatService {

    @Autowired
    BoatRepository boatRepository;


    @Override
    public List<Boat> findAll()
    {
        return boatRepository.findAll();
    }
}
