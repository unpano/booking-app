package ftn.booking.repository;


import ftn.booking.model.BoatSubscription;
import ftn.booking.model.CottageSubscription;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CottageSubscriptionRepository extends JpaRepository< CottageSubscription, Long> {

    List<CottageSubscription> findAllByClientId(Long clientId);
}
