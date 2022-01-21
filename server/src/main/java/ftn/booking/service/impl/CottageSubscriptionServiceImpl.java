package ftn.booking.service.impl;

import ftn.booking.model.CottageSubscription;
import ftn.booking.repository.CottageSubscriptionRepository;
import ftn.booking.service.CottageSubscriptionService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CottageSubscriptionServiceImpl implements CottageSubscriptionService {

    private CottageSubscriptionRepository cottageSubscriptionRepository;

    @Override
    public void delete(Long cottageSubscriptionId) {

        CottageSubscription bs = cottageSubscriptionRepository.findById(cottageSubscriptionId).orElse(null);
        cottageSubscriptionRepository.delete(bs);
    }

    @Override
    public CottageSubscription add(CottageSubscription bs) {
        return cottageSubscriptionRepository.save(bs);
    }

    @Override
    public List<CottageSubscription> findAllByClinet(Long userId) {
        return cottageSubscriptionRepository.findAllByClientId(userId);
    }

}
