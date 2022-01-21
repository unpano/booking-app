package ftn.booking.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.List;


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

    @OneToMany
    private List<Adventure> adventures;
}
