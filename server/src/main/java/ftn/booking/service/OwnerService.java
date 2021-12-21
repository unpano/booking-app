package ftn.booking.service;

import ftn.booking.model.BoatOwner;
import ftn.booking.model.CottageOwner;
import ftn.booking.model.Instructor;

import javax.persistence.criteria.CriteriaBuilder;


public interface OwnerService {

    BoatOwner addBoatOwner(BoatOwner boatOwner);

    CottageOwner addCottageOwner(CottageOwner cottageOwner);

    Instructor addInstructor(Instructor instructor);
}
