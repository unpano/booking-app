package ftn.booking.service.impl;

import ftn.booking.model.Cottage;
import ftn.booking.model.Image;
import ftn.booking.repository.ImageRepository;
import ftn.booking.service.ImageService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class ImageServiceImpl implements ImageService {

    private ImageRepository imageRepository;

    @Override
    public Image add(Image image) {
        return imageRepository.save(image);
    }

    @Override
    public List<String> findImagesByCottageId(Long cottageId) {
        List<Image> images = imageRepository.findAllByCottageId(cottageId);
        List<String> paths = new ArrayList<>();

        for(Image image : images){
            paths.add(image.getPath());
        }

        return paths;
    }

    @Override
    public void deleteAll(Long id) {
        imageRepository.deleteByCottageId(id);
    }
}
