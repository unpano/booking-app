package ftn.booking.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table
@DiscriminatorValue("Client")
@Setter
@Getter
public class Client extends User{

    private Integer numOfPenalties;
}
