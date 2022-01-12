package ftn.booking.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("BoatOwner")
@Setter
@Getter
public class BoatOwner extends User{

    private String reasonForRegistration;
}
