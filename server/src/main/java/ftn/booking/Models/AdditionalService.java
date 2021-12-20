package ftn.booking.Models;

import javax.persistence.*;
import java.util.List;

@Entity
public class AdditionalService {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;

    private String info;

    private String name;

    private Long price;

    @ManyToMany
    @JoinColumn(name = "boat_id", nullable = false)
    private List<Boat> boat;


    public AdditionalService() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }
}
