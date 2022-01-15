package ftn.booking.service.impl;

import ftn.booking.model.BoatImage;
import ftn.booking.model.CottageImage;
import ftn.booking.repository.BoatImageRepository;
import ftn.booking.service.BoatImageService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class BoatImageServiceImpl implements BoatImageService {

    private BoatImageRepository boatImageRepository;

    @Override
    public BoatImage add(BoatImage image) {
        return boatImageRepository.save(image);
    }

    @Override
    public List<String> findImagesByBoatId(Long boatId) {
        List<BoatImage> images = boatImageRepository.findAllByBoatId(boatId);
        List<String> paths = new ArrayList<>();

        for(BoatImage image : images){
            paths.add(image.getPath());
        }

        return paths;
    }

    @Override
    public void deleteAll(Long id) {
        boatImageRepository.deleteByBoatId(id);
    }
}
