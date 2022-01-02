package ftn.booking.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.Table;


@Entity
@Table(name = "Instructor")
@DiscriminatorValue("Instructor")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Instructor extends User{

    private String biography;
    private String reasonForRegistration;
}
