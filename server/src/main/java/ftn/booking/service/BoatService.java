package ftn.booking.service;
import ftn.booking.model.Boat;
import java.util.List;

public interface BoatService {

    List<Boat> findAll();
    Boat findById(Long id);
}
