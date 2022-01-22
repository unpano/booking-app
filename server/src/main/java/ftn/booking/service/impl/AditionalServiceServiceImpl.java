package ftn.booking.service.impl;

import ftn.booking.model.Action;
import ftn.booking.model.AdditionalService;
import ftn.booking.model.enums.ReservationType;
import ftn.booking.repository.AdditionalServiceRepository;
import ftn.booking.service.AditionalServiceService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class AditionalServiceServiceImpl implements AditionalServiceService {

    private AdditionalServiceRepository additionalServiceRepository;

    @Override
    public List<AdditionalService> findByEntityIdAndEntityType(ReservationType entityType, Long id)
    {
        if(entityType == ReservationType.BOAT)
        {
            return additionalServiceRepository.findAllByBoatId(id);
        }
        else if(entityType == ReservationType.COTTAGE)
        {
            return additionalServiceRepository.findAllByCottageId(id);
        }


        return additionalServiceRepository.findAllByAdventureId(id);
    }
}
