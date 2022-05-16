package ftn.booking.service;

import ftn.booking.dto.*;
import ftn.booking.model.Adventure;
import ftn.booking.model.AdventureImage;
import ftn.booking.model.Client;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

public interface AdventureService {
    Adventure addAdventure(Adventure adventure);

    Boolean deleteAdventure(Long adventureId);

    List<AdventureDTO> getAllAdventures(Long instructorId);

    String addAdventurePicture(MultipartFile file, Long adventureId) throws IOException;

    String deleteAdventurePicture(Long pictureId) throws IOException;

    List<AdventureImage> getAdventurePictures(Long adventureId);

    AdventureDTO getOneAdventure(Long adventureId);

    AdventureDTO changeOneAdventure(Adventure changedAdventure);

    AdventureActionDTO addNewActionForAdventure(AdventureActionDTO adventureReservationDTO,
                                                Long adventureId);

    List<AdventureAdditionalServiceDTO> addAdditionalServicesForAdventureAction(
            List<String> additionalServicesAdvAction,
            Long adventureReservationId);

    List<AdventureActionDTO> getAllActionsForAdventure(Long adventureId);

    List<AdventureActionDTO> getAllActionsForClient(Long clientId);

    List<AdventureActionDTO> getAllBookedActionsForClient(Long clientId);

    List<AdventureActionDTO> getAllPastActionsForAdventure(Long adventureId);

    List<AdventureAdditionalServiceDTO> getAllAdditionalServicesForReservation(Long adventureReservationId);

    AdventureActionDTO getOneActionForAdventure(Long adventureReservationId);

    AdventureActionDTO changeOneActionForAdventure(AdventureActionDTO changedAction,
                                                   Long adventureReservationId);

    String deleteActionForAdventure(Long adventureReservationId);

    List<LocalDateTime> getForbidenDatesSpecificAction(Long actionId);

    List<LocalDateTime> getForbidenDates();

    Long changeNumOfActiveActions(Long adventureId);

    Long changeNumOfPastActions(Long adventureId);

    AdventureActionClientsDTO addNewBookingForAction(Long adventureActionId,
                                                     Long clientId);

    Boolean cancelBookingForAction(Long actionId ,Long clientId);

    Boolean changeStatusOfActionBooking();

    List<Client> getAllClientsBookedAction(Long actionId);

    Long findAdventureIdForAction(Long actionId);
}