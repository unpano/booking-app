package ftn.booking.repository;

import ftn.booking.model.BoatImage;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
public interface BoatImageRepository extends JpaRepository<BoatImage, Long> {

    List<BoatImage> findAllByBoatId(Long boatId);
    void deleteByBoatId(Long id);
}
