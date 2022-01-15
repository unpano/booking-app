package ftn.booking.service.impl;

import ftn.booking.dto.ReservationDTO;
import ftn.booking.model.Boat;
import ftn.booking.model.Reservation;
import ftn.booking.repository.BoatRepository;
import ftn.booking.repository.ReservationRepository;
import ftn.booking.service.BoatService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class BoatServiceImpl implements BoatService {

    BoatRepository boatRepository;
    ReservationRepository reservationRepository;

    @Override
    public List<Boat> findAll()
    {
        return boatRepository.findAll();
    }

    @Override
    public Boat findById(Long id)
    {
        return boatRepository.findById(id).get();
    }

    @Override
    public List<Boat> findFreeBoats(LocalDateTime startTime, LocalDateTime endTime)
    {
        List<Boat> resultBoats = new ArrayList<>();
        List<Boat> allBoats = boatRepository.findAll();
        List<Reservation> reservations = reservationRepository.findAllByReservationTypeAndStartTimeAndEndTime
                ("BOAT", startTime, endTime);

        for (Boat boat : allBoats)
        {
            Boolean taken = false;
            for (Reservation res : reservations)
            {
                if( res.getBoat() == boat)
                {
                    taken = true;
                }
            }
            if( taken == false)
            {
                resultBoats.add(boat);
            }

        }

        return resultBoats;
    }

    @Override
    public Boat add(Boat boat) {
        return boatRepository.save(boat);
    }

    @Override
    public List<Boat> findAllOwnerBoats(Long id) {
        return boatRepository.findAllByBoatOwnerId(id);
    }
}
