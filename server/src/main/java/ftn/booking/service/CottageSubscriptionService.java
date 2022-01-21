package ftn.booking.service;

import ftn.booking.model.CottageSubscription;
import java.util.List;

public interface CottageSubscriptionService {

    void delete(Long cottageSubscriptionId);
    CottageSubscription add(CottageSubscription bs);
    List<CottageSubscription> findAllByClinet(Long userId);
}
