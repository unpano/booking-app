package ftn.booking.service.impl;
import ftn.booking.dto.ReservationDTO;
import ftn.booking.exception.NotFoundException;
import ftn.booking.model.Boat;
import ftn.booking.model.Cottage;
import ftn.booking.model.Reservation;
import ftn.booking.repository.CottageRepository;
import ftn.booking.repository.ReservationRepository;
import ftn.booking.service.CottageService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CottageServiceImpl implements CottageService {

    private CottageRepository cottageRepository;
    private ReservationRepository reservationRepository;

    @Override
    public List<Cottage> findAll()
    {
        return cottageRepository.findAll();
    }

    @Override
    public Cottage findOne(Long id)
    {
        return cottageRepository.findById(id).get();
    }

    public List<Cottage> findAllOwnerCottages(Long id) {
        return cottageRepository.findAllByCottageOwnerId(id);
    }

    @Override
    public Cottage findById(Long cottageId)
    {
        Optional<Cottage> cottage = cottageRepository.findById(cottageId);

        if(cottage.isEmpty())
            throw new NotFoundException("Cottage does not exist.");

        return cottage.get();
    }

    @Override
    public Cottage add(Cottage cottage) {
        return cottageRepository.save(cottage);
    }

    @Override
    public List<Cottage> findFreeCottages(ReservationDTO reservationDTO) {
        List<Cottage> resultCottages = new ArrayList<>();
        List<Cottage> allCottages = cottageRepository.findAll();
        List<Reservation> reservations = reservationRepository.findAllByReservationTypeAndStartTimeAndEndTime
                ("COTTAGE", reservationDTO.getStartTime(), reservationDTO.getEndTime());

        for (Cottage cottage : allCottages) {
            Boolean taken = false;
            for (Reservation res : reservations) {
                if (res.getCottage() == cottage) {
                    taken = true;
                }
            }
            if (taken == false) {
                resultCottages.add(cottage);
            }

        }

        return resultCottages;
    }
    public void delete(Cottage cottage) {
        cottageRepository.delete(cottage);
    }

    @Override
    public Cottage update(Cottage cottage) {
        return cottageRepository.save(cottage);
    }
}
