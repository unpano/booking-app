package ftn.booking.service.impl;


import ftn.booking.model.Action;
import ftn.booking.model.Reservation;
import ftn.booking.model.User;
import ftn.booking.model.enums.ReservationType;
import ftn.booking.repository.ActionRepository;
import ftn.booking.service.ActionService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
        List<Action> return_actions = new ArrayList<>();


        if(entityType == ReservationType.BOAT)
        {
            System.out.println(entityType);
            return_actions =  actionRepository.findAllActionsByBoatIdAndTaken(id, false);
        }
       else if(entityType == ReservationType.COTTAGE)
        {
            return_actions =  actionRepository.findAllActionsByCottageId(id);
        }
        else if(entityType == ReservationType.ADVENTURE)
        {
            return_actions =  actionRepository.findAllActionsByAdventureIdAndTaken(id, false);
        }



        return return_actions;
    }




    @Override
    public Action delete(Long actionId) {

        Action a = actionRepository.findById(actionId).orElse(null);
        a.setTaken(true);
        return actionRepository.save(a);
    }
}
