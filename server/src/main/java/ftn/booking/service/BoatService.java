package ftn.booking.service;
import ftn.booking.dto.BoatDTO;
import ftn.booking.dto.BoatOwnerDTO;
import ftn.booking.model.Boat;
import org.springframework.web.bind.annotation.PathVariable;

import java.time.LocalDateTime;
import java.util.List;

public interface BoatService {

    List<Boat> findAll();
    Boat findById(Long id);
    List<Boat> findFreeBoats(LocalDateTime startTime, LocalDateTime endTime);
    List<BoatOwnerDTO> getAllBoatOwner();

    Boolean deleteBoatOwner(Long boatOwnerId);

    List<BoatDTO> getAllBoatsForAdmin();

    Boolean deleteBoatByAdmin(Long boatId);
}
