package ftn.booking.service;

import ftn.booking.model.Action;
import ftn.booking.model.AdditionalService;
import ftn.booking.model.enums.ReservationType;

import java.util.List;

public interface AditionalServiceService {
    List<AdditionalService> findByEntityIdAndEntityType(ReservationType entityType, Long id);
}
