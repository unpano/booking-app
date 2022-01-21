package ftn.booking.service.impl;

import ftn.booking.model.Adventure;
import ftn.booking.model.Boat;
import ftn.booking.model.Reservation;
import ftn.booking.model.enums.ReservationType;
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
        List<Adventure> allAdventures = adventureRepository.findAll();
        List<Reservation> all_reservations = reservationRepository.findAllByReservationType(ReservationType.ADVENTURE);

        for (Reservation res: all_reservations) {
            if(res.getStartTime().isEqual( startTime) || res.getEndTime().isEqual( endTime))
            {
                allAdventures.remove(res.getBoat());
            }
            else if(res.getStartTime().isAfter( startTime) && res.getStartTime().isBefore( endTime))
            {
                allAdventures.remove(res.getBoat());
            }
            if(res.getEndTime().isAfter( startTime) && res.getEndTime().isBefore( endTime))
            {
                allAdventures.remove(res.getBoat());
            }
            if(res.getStartTime().isBefore( startTime) && res.getEndTime().isAfter( endTime))
            {
                allAdventures.remove(res.getBoat());
            }
        }

        return allAdventures;
    }
}
