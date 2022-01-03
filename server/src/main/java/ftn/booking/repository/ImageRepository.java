package ftn.booking.repository;

import ftn.booking.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ImageRepository extends JpaRepository<Image, Long> {
    List<Image> findAllByCottageId(Long cottageId);
}
