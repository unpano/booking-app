package ftn.booking.service;

import ftn.booking.model.BoatImage;

import java.util.List;

public interface BoatImageService {
    BoatImage add(BoatImage image);

    List<String> findImagesByBoatId(Long cottageId);

    void deleteAll(Long id);
}
