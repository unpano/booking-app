package ftn.booking.service.impl;


import ftn.booking.model.BoatSubscription;
import ftn.booking.model.Reservation;
import ftn.booking.repository.BoatSubscriptionRepository;
import ftn.booking.service.BoatService;
import ftn.booking.service.BoatSubscriptionService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class BoatSubscriptionServiceImpl implements BoatSubscriptionService {

    private BoatSubscriptionRepository boatSubscriptionRepository;

    @Override
    public void delete(Long boatSubscriptionId) {

        BoatSubscription bs = boatSubscriptionRepository.findById(boatSubscriptionId).orElse(null);
        boatSubscriptionRepository.delete(bs);
    }

    @Override
    public BoatSubscription add(BoatSubscription bs) {
        return boatSubscriptionRepository.save(bs);
    }

    @Override
    public List<BoatSubscription> findAllByClinet(Long userId) {
        return boatSubscriptionRepository.findAllByClientId(userId);
    }

}
