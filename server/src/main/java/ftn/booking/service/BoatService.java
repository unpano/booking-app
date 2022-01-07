package ftn.booking.service;
import ftn.booking.dto.ReservationDTO;
import ftn.booking.model.Boat;

import java.time.LocalDateTime;
import java.util.List;

public interface BoatService {

    List<Boat> findAll();
    Boat findById(Long id);
    List<Boat> findFreeBoats(ReservationDTO reservationDTO);
}
