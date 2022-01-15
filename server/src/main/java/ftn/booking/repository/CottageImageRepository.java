package ftn.booking.repository;

import ftn.booking.model.CottageImage;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
public interface CottageImageRepository extends JpaRepository<CottageImage, Long> {

    List<CottageImage> findAllByCottageId(Long cottageId);
    void deleteByCottageId(Long id);
}
