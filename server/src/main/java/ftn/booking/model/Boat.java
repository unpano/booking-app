package ftn.booking.model;

import ftn.booking.model.enums.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "boats")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Boat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Float length;

    private Integer numberOfMotors;

    private Long motorPower;

    private Float maxSpeed;

    private String address;

    private String description;

    private Integer capacity;

    private Float rate;

    private Float oneDayPrice;

    private LocalTime checkout;

    @ManyToOne
    private BoatOwner boatOwner;

    @Enumerated(EnumType.STRING)
    private BoatType boatType;

    @Enumerated(EnumType.STRING)
    private CancelationType cancelationType;

    @Enumerated
    @ElementCollection(targetClass = NavigationEquipment.class)
    private List<NavigationEquipment> navigationEquipment = new ArrayList<>();

    //Pravila ponasanja
    @Enumerated
    @ElementCollection(targetClass = Service.class)
    private List<Service> additionalServices = new ArrayList<>();

    //Pecaroska oprema
    @Enumerated
    @ElementCollection(targetClass = FishingEquipment.class)
    private List<FishingEquipment> fishingEquipment = new ArrayList<>();

    //Dodatne usluge
    @Enumerated
    @ElementCollection(targetClass = Amenity.class)
    private List<Amenity> amenities = new ArrayList<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "boat_subscriber",
            joinColumns = @JoinColumn(name = "boat_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id")
    )
    private List<Client> subscribers = new ArrayList<>();

//    @ManyToMany(fetch = FetchType.LAZY)
//    @JoinTable(
//            name = "boat_service",
//            joinColumns = @JoinColumn(name = "boat_id", referencedColumnName = "id"),
//            inverseJoinColumns = @JoinColumn(name = "service_id", referencedColumnName = "id")
//    )
//    private List<AdditionalService> boatAdditionalServices = new ArrayList<>();


    //@OneToOne
    //@JoinColumn(name = "report_id", nullable = false)
    //private BoatReport report;

}
