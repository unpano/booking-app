package ftn.booking.service.impl;

import ftn.booking.model.Boat;
import ftn.booking.repository.BoatRepository;
import ftn.booking.service.BoatService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class BoatServiceImpl implements BoatService {

    BoatRepository boatRepository;

    @Override
    public List<Boat> findAll()
    {
        return boatRepository.findAll();
    }

    @Override
    public Boat findById(Long id)
    {
        return boatRepository.findById(id).get();
    }
}
