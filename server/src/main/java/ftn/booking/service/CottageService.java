package ftn.booking.service;
import ftn.booking.dto.CottageDTO;
import ftn.booking.dto.CottageOwnerDTO;
import ftn.booking.dto.ReservationDTO;
import ftn.booking.model.Boat;
import ftn.booking.model.Cottage;
import org.springframework.web.bind.annotation.PathVariable;

import java.time.LocalDateTime;
import java.util.List;

public interface CottageService {

    List<Cottage> findAll();
    Cottage findOne(Long id);
    List<Cottage> findAllOwnerCottages(Long id);
    Cottage findById(Long cottageId);
    Cottage add(Cottage cottage);
    List<Cottage> findFreeCottages(ReservationDTO reservationDTO);
    void delete(Cottage cottage);
    Cottage update(Cottage cottage);

    List<CottageOwnerDTO> getAllCottageOwners();

    Boolean deleteCottageOwner(Long cottageOwnerId);

    List<CottageDTO> getAllCottagesForAdmin();

    Boolean deleteCottage(Long cottageId);
}
