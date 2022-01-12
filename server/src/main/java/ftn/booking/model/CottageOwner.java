package ftn.booking.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("CottageOwner")
@Setter
@Getter
public class CottageOwner extends User{

    private String reasonForRegistration;
}
