package ftn.booking.repository;

import ftn.booking.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
public interface ImageRepository extends JpaRepository<Image, Long> {

    List<Image> findAllByCottageId(Long cottageId);
    void deleteByCottageId(Long id);
}
