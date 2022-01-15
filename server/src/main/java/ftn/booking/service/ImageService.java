package ftn.booking.service;

import ftn.booking.model.Cottage;
import ftn.booking.model.CottageImage;
import ftn.booking.model.CottageImage;

import java.util.List;

public interface ImageService {
    CottageImage add(CottageImage image);

    List<String> findImagesByCottageId(Long cottageId);

    void deleteAll(Long id);
}
