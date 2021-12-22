package ftn.booking.service.impl;


import ftn.booking.model.Cottage;
import ftn.booking.repository.CottageRepository;
import ftn.booking.service.CottageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CottageServiceImpl implements CottageService {

    @Autowired
    private CottageRepository cottageRepository;

    @Override
    public List<Cottage> findAll()
    {
        return cottageRepository.findAll();
    }

}
