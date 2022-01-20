package ftn.booking.service;

import ftn.booking.model.BoatSubscription;

import java.util.List;

public interface BoatSubscriptionService {

    void delete(Long boatSubscriptionId);
    BoatSubscription add(BoatSubscription bs);
    List<BoatSubscription> findAllByClinet(Long userId);
}
