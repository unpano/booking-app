package ftn.booking.repository;


import ftn.booking.model.AdventureActionClients;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdventureActionClientsRepository extends JpaRepository<AdventureActionClients,Long> {
}
