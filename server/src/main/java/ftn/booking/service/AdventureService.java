package ftn.booking.service;

import ftn.booking.dto.AdventureAdditionalServiceDTO;
import ftn.booking.dto.AdventureDTO;
import ftn.booking.dto.AdventureReservationDTO;
import ftn.booking.model.Adventure;
import ftn.booking.model.AdventureImage;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.Multipart;
import java.io.IOException;
import java.util.List;

public interface AdventureService {
    Adventure addAdventure(Adventure adventure);

    Boolean deleteAdventure(Long adventureId);

    List<AdventureDTO> getAllAdventures(Long instructorId);

    String addAdventurePicture(MultipartFile file, Long adventureId) throws IOException;

    String deleteAdventurePicture(Long pictureId) throws IOException;

    List<AdventureImage> getAdventurePictures(Long adventureId);

    AdventureDTO getOneAdventure( Long adventureId);

    AdventureDTO changeOneAdventure(Adventure changedAdventure);

    AdventureReservationDTO addNewActionForAdventure(AdventureReservationDTO adventureReservationDTO,
                                                       Long adventureId);

    List<AdventureAdditionalServiceDTO> addAdditionalServicesForAdventureAction(
             List<String> additionalServicesAdvAction,
             Long adventureReservationId);

    List<AdventureReservationDTO> getAllActionsForAdventure(Long adventureId);

    List<AdventureAdditionalServiceDTO> getAllAdditionalServicesForReservation(Long adventureReservationId);

    AdventureReservationDTO getOneActionForAdventure(Long adventureReservationId);

    AdventureReservationDTO changeOneActionForAdventure(AdventureReservationDTO changedAction,
                                                         Long adventureReservationId);

    String deleteActionForAdventure(Long adventureReservationId);




}
