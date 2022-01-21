package ftn.booking.service.impl;


import ftn.booking.model.AdventureSubscription;
import ftn.booking.model.Reservation;
import ftn.booking.repository.AdventureSubscriptionRepository;
import ftn.booking.service.AdventureService;
import ftn.booking.service.AdventureSubscriptionService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class AdventureSubscriptionServiceImpl implements AdventureSubscriptionService {

    private AdventureSubscriptionRepository adventureSubscriptionRepository;

    @Override
    public void delete(Long adventureSubscriptionId) {

        AdventureSubscription bs = adventureSubscriptionRepository.findById(adventureSubscriptionId).orElse(null);
        adventureSubscriptionRepository.delete(bs);
    }

    @Override
    public AdventureSubscription add(AdventureSubscription bs) {
        return adventureSubscriptionRepository.save(bs);
    }

    @Override
    public List<AdventureSubscription> findAllByClinet(Long userId) {
        return adventureSubscriptionRepository.findAllByClientId(userId);
    }

}
