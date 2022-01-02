package ftn.booking.service.impl;


import ftn.booking.model.Cottage;
import ftn.booking.repository.CottageRepository;
import ftn.booking.service.CottageService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CottageServiceImpl implements CottageService {

    private CottageRepository cottageRepository;

    @Override
    public List<Cottage> findAll()
    {
        return cottageRepository.findAll();
    }

    @Override
    public Cottage findOne(Long id)
    {
        return cottageRepository.findById(id).get();
    }

}
