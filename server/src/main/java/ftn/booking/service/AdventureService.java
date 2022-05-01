package ftn.booking.service;

import ftn.booking.dto.AdventureDTO;
import ftn.booking.model.Adventure;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface AdventureService {
    Adventure addAdventure(Adventure adventure);

    List<AdventureDTO> getAllAdventures();

    String addAdventurePicture(MultipartFile file, Long adventureId) throws IOException;

}
