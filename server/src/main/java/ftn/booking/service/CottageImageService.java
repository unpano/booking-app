package ftn.booking.service;

import ftn.booking.model.CottageImage;

import java.util.List;

public interface CottageImageService {
    CottageImage add(CottageImage image);

    List<String> findImagesByCottageId(Long cottageId);

    void deleteAll(Long id);
}
