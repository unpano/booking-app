package ftn.booking.service;

import ftn.booking.model.Cottage;

import java.util.List;

public interface CottageService {
    List<Cottage> findAllOwnerCottages(Long id);

    Cottage findById(Long cottageId);
}
