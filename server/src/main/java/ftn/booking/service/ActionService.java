package ftn.booking.service;

import ftn.booking.model.Action;
import ftn.booking.model.enums.ReservationType;

import java.util.List;

public interface ActionService {

    List<Action> findAll();
    Action delete(Long actionId);
    List<Action> findByEntityIdAndEntityType(ReservationType entityType, Long id);

}
