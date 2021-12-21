package ftn.booking.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;


@Entity
@DiscriminatorValue("Admin")
@Setter
@Getter
public class Admin extends User{
}
