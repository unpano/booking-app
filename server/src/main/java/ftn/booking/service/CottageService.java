package ftn.booking.service;
import ftn.booking.dto.ReservationDTO;
import ftn.booking.model.Boat;
import ftn.booking.model.Cottage;

import java.time.LocalDateTime;
import java.util.List;

public interface CottageService {

    List<Cottage> findAll();
    Cottage findOne(Long id);
    List<Cottage> findAllOwnerCottages(Long id);
    Cottage findById(Long cottageId);
    Cottage add(Cottage cottage);
    List<Cottage> findFreeCottages(ReservationDTO reservationDTO);
}
