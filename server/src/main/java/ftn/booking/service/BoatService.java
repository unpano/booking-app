package ftn.booking.service;

import ftn.booking.model.Boat;
import org.springframework.stereotype.Service;

import java.util.List;

public interface BoatService {

    List<Boat> findAll();
}
