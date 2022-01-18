package ftn.booking.service.impl;

import ftn.booking.model.Adventure;
import ftn.booking.model.Boat;
import ftn.booking.model.Reservation;
import ftn.booking.repository.AdventureRepository;
import ftn.booking.repository.ReservationRepository;
import ftn.booking.service.AdventureService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class AdventureServiceImpl implements AdventureService {

    AdventureRepository adventureRepository;
    ReservationRepository reservationRepository;


    @Override
    public List<Adventure> findAll()
    {
        return adventureRepository.findAll();
    }

    @Override
    public Adventure findById(Long id)
    {
        return adventureRepository.findById(id).get();
    }


    @Override
    public List<Adventure> findFreeAdventures(LocalDateTime startTime, LocalDateTime endTime)
    {
        List<Adventure> resultAdventures = new ArrayList<>();
        List<Adventure> allAdventures = adventureRepository.findAll();

        List<Reservation> reservations = reservationRepository.findAllByReservationTypeAndStartTimeAndEndTime
                ("ADVENTURE", startTime, endTime);

        for (Adventure adventure : allAdventures)
        {
            Boolean taken = false;
            for (Reservation res : reservations)
            {
                if( res.getAdventure() == adventure)
                {
                    taken = true;
                    break;
                }
            }
            if( taken == false)
            {
                resultAdventures.add(adventure);
            }

        }

        return resultAdventures;
    }
}
