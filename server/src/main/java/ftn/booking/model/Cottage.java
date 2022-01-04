package ftn.booking.model;


import ftn.booking.model.enums.Amenity;
import ftn.booking.model.enums.Behaviour;
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

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "cottage_room",
            joinColumns = @JoinColumn(name = "cottage_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "room_id", referencedColumnName = "id")
    )
    private List<Room> rooms = new ArrayList<>();

    //Pravila ponasanja
    @Enumerated
    @ElementCollection(targetClass = Behaviour.class)
    private List<Behaviour> behaviorRules = new ArrayList<>();

    //Dodatne usluge
    @Enumerated
    @ElementCollection(targetClass = Amenity.class)
    private List<Amenity> amenities = new ArrayList<>();

    private int maxNumOfPersons;

    private Float rate;

    @ManyToOne
    private CottageOwner cottageOwner;

//    @ManyToMany(fetch = FetchType.LAZY)
//    @JoinTable(
//            name = "cottage_service",
//            joinColumns = @JoinColumn(name = "cottage_id", referencedColumnName = "id"),
//            inverseJoinColumns = @JoinColumn(name = "service_id", referencedColumnName = "id")
//    )
//    private List<AdditionalService> cottageAdditionalServices = new ArrayList<>();
}
