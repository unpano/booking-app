package ftn.booking.service;

import ftn.booking.dto.AdventureDTO;
import ftn.booking.model.Adventure;

import java.util.List;

public interface AdventureService {
    Adventure addAdventure(Adventure adventure);

    List<AdventureDTO> getAllAdventures();
}
