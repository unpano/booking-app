package ftn.booking.model;


import ftn.booking.model.enums.Amenity;
import ftn.booking.model.enums.Service;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "cottages")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Cottage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private String address;

    @NotNull
    private String city;

    private String description;

    private int maxNumOfPersons;

    private Float rate;

    private Float oneDayPrice;

    @ManyToOne
    private CottageOwner cottageOwner;

    //Pravila ponasanja
    @Enumerated
    @ElementCollection(targetClass = Service.class)
    private List<Service> additionalServices = new ArrayList<>();

    //Dodatne usluge
    @Enumerated
    @ElementCollection(targetClass = Amenity.class)
    private List<Amenity> amenities = new ArrayList<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "cottage_room",
            joinColumns = @JoinColumn(name = "cottage_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "room_id", referencedColumnName = "id")
    )
    private List<Room> rooms = new ArrayList<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "cottage_subscriber",
            joinColumns = @JoinColumn(name = "cottage_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id")
    )
    private List<Client> subscribers = new ArrayList<>();

    @OneToMany
    private List<EntityImage> images = new ArrayList<>();
}
