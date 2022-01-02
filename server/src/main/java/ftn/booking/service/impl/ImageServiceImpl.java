package ftn.booking.service.impl;

import ftn.booking.model.Image;
import ftn.booking.repository.ImageRepository;
import ftn.booking.service.ImageService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ImageServiceImpl implements ImageService {

    private ImageRepository imageRepository;

    @Override
    public Image add(Image image) {
        return imageRepository.save(image);
    }
}
