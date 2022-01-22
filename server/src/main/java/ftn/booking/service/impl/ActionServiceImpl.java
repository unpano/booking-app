package ftn.booking.service.impl;


import ftn.booking.model.Action;
import ftn.booking.model.Reservation;
import ftn.booking.model.enums.ReservationType;
import ftn.booking.repository.ActionRepository;
import ftn.booking.service.ActionService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ActionServiceImpl implements ActionService {

    private ActionRepository actionRepository;

    @Override
    public List<Action> findAll()
    {
        return actionRepository.findAll();
    }

    @Override
    public List<Action> findByEntityIdAndEntityType(ReservationType entityType, Long id)
    {
        if(entityType == ReservationType.BOAT)
        {
            return actionRepository.findAllActionsByBoatId(id);
        }
       else if(entityType == ReservationType.COTTAGE)
        {
            return actionRepository.findAllActionsByCottageId(id);
        }


        return actionRepository.findAllActionsByAdventureId(id);
    }





    @Override
    public void delete(Long actionId) {

        Action a = actionRepository.findById(actionId).orElse(null);
        actionRepository.delete(a);
    }
}
