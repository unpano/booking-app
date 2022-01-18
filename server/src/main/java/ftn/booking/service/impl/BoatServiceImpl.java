package ftn.booking.service.impl;

import ftn.booking.dto.ReservationDTO;
import ftn.booking.model.AdditionalService;
import ftn.booking.model.Boat;
import ftn.booking.model.Reservation;
import ftn.booking.model.enums.ReservationType;
import ftn.booking.repository.AdditionalServiceRepository;
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
    AdditionalServiceRepository additionalServiceRepository;

    @Override
    public List<Boat> findAll()
    {
        return boatRepository.findAll();
    }

    @Override
    public Boat findById(Long id)
    {
        return boatRepository.findById(id).orElse(null);
    }


    @Override
    public List<AdditionalService> findAdditionalServices(Long boatId)
    {
        return additionalServiceRepository.findAllByBoatId(boatId);
    }

    @Override
    public List<Boat> findFreeBoats(LocalDateTime startTime, LocalDateTime endTime)
    {
        List<Boat> resultBoats = new ArrayList<>();
        List<Boat> allBoats = boatRepository.findAll();
        List<Reservation> reservations = reservationRepository.findAllByReservationTypeAndStartTimeAndEndTime
                (ReservationType.BOAT.toString(), startTime, endTime);

        for (Boat boat : allBoats)
        {
            Boolean taken = false;
            for (Reservation res : reservations)
            {
                if( res.getBoat().getId() == boat.getId() )
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
}
