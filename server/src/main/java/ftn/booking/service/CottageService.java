package ftn.booking.service;
import ftn.booking.model.Cottage;
import java.util.List;

public interface CottageService {

    List<Cottage> findAll();
    Cottage findOne(Long id);
    List<Cottage> findAllOwnerCottages(Long id);
    Cottage findById(Long cottageId);
    Cottage add(Cottage cottage);
    void delete(Cottage cottage);

    Cottage update(Cottage cottage);
}
