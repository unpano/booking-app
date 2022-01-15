package ftn.booking.service.impl;

import ftn.booking.model.CottageImage;
import ftn.booking.repository.CottageImageRepository;
import ftn.booking.service.ImageService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class ImageServiceImpl implements ImageService {

    private CottageImageRepository imageRepository;

    @Override
    public CottageImage add(CottageImage image) {
        return imageRepository.save(image);
    }

    @Override
    public List<String> findImagesByCottageId(Long cottageId) {
        List<CottageImage> images = imageRepository.findAllByCottageId(cottageId);
        List<String> paths = new ArrayList<>();

        for(CottageImage image : images){
            paths.add(image.getPath());
        }

        return paths;
    }

    @Override
    public void deleteAll(Long id) {
        imageRepository.deleteByCottageId(id);
    }
}
