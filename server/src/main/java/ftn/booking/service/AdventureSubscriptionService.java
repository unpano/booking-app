package ftn.booking.service;

import ftn.booking.model.AdditionalService;
import ftn.booking.model.Adventure;
import ftn.booking.model.AdventureSubscription;

import java.time.LocalDateTime;
import java.util.List;

public interface AdventureSubscriptionService {

    void delete(Long adventureSubscriptionId);
    AdventureSubscription add(AdventureSubscription bs);
    List<AdventureSubscription> findAllByClinet(Long userId);
}
