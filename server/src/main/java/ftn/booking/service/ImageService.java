package ftn.booking.service;

import ftn.booking.model.Cottage;
import ftn.booking.model.Image;

import java.util.List;

public interface ImageService {
    Image add(Image image);

    List<String> findImagesByCottageId(Long cottageId);

    void deleteAll(Long id);
}
