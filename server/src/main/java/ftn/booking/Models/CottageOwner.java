package ftn.booking.Models;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
public class CottageOwner extends User{

    @OneToMany
    private List<Cottage> cottages;
}
