package ftn.booking.service;

import ftn.booking.model.Boat;

import java.time.LocalDateTime;
import java.util.List;

public interface BoatService {

    List<Boat> findAll();
    List<Boat> findFreeBoats(LocalDateTime startTime, LocalDateTime endTime);

    Boat add(Boat boat);
    Boat findById(Long id);
    List<Boat> findAllOwnerBoats(Long id);

    void delete(Boat boat);

    Boat update(Boat boat);

    Boat findOne(Long entityId);
}
