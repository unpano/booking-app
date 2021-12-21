package ftn.booking.repository;

import ftn.booking.model.Adventure;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface AdventureRepository extends JpaRepository<Adventure, Long> {

    List<Adventure> findAll();
}
