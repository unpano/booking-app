package ftn.booking.Models;

import javax.persistence.*;
import java.util.List;

@Entity
public class Cottage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String address;

    private String description;

    private String rules;

    private Integer roomNum;

    private Long price;

    private Integer rate;

    @ManyToOne
    private CottageOwner cottageOwner;

    @OneToMany
    private List<Reservation> reservations;

    ///pictures

    private  int maxNumOfPersons;

    public Cottage() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getRules() {
        return rules;
    }

    public void setRules(String rules) {
        this.rules = rules;
    }

    public Integer getRoomNum() {
        return roomNum;
    }

    public void setRoomNum(Integer roomNum) {
        this.roomNum = roomNum;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public Integer getRate() {
        return rate;
    }

    public void setRate(Integer rate) {
        this.rate = rate;
    }

    public int getMaxNumOfPersons() {
        return maxNumOfPersons;
    }

    public void setMaxNumOfPersons(int maxNumOfPersons) {
        this.maxNumOfPersons = maxNumOfPersons;
    }
}
