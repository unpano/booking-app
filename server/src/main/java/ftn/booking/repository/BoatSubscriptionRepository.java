package ftn.booking.repository;

import ftn.booking.model.BoatSubscription;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoatSubscriptionRepository extends JpaRepository<BoatSubscription, Long> {

    List<BoatSubscription> findAllByClientId(Long clientId);
}
