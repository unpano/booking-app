package ftn.booking.repository;

import ftn.booking.model.AdventureSubscriber;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdventureSubscribeRepository extends JpaRepository<AdventureSubscriber,Long> {
    AdventureSubscriber findByAdventureIdAndClientId(Long adventureId,Long clientId);
}
