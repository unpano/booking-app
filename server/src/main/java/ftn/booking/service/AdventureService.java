package ftn.booking.service;

import ftn.booking.model.Adventure;
import ftn.booking.model.Boat;

import java.time.LocalDateTime;
import java.util.List;

public interface AdventureService {

    List<Adventure> findFreeAdventures(LocalDateTime startTime, LocalDateTime endTime);
    List<Adventure> findAll();
}
