package ftn.booking.repository;

import ftn.booking.model.AdventureSubscription;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdventureSubscriptionRepository extends JpaRepository<AdventureSubscription, Long> {

    List<AdventureSubscription> findAllByClientId(Long clientId);
}
