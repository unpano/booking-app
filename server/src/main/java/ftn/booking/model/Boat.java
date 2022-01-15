package ftn.booking.model;

import ftn.booking.model.enums.BoatType;
import ftn.booking.model.enums.CancelationPrice;
import ftn.booking.model.enums.NavigationEquipment;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
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

    private String address;

    private String behaviorRules;

    private CancelationPrice cancellationPrice;

    private Integer capacity;

    private String fishingEquipment;

    private Long maxSpeed;

    private Long motorPower;

    private String description;

    private Long numberOfMotors;

    private Long rating;

    @Enumerated(EnumType.STRING)
    private BoatType type;

    private Long length;

    @Enumerated(EnumType.STRING)
    private NavigationEquipment navigationEquipment;

    ///pictures

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "boat_service",
            joinColumns = @JoinColumn(name = "boat_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "service_id", referencedColumnName = "id")
    )
    private List<AdditionalService> boatAdditionalServices = new ArrayList<>();



}
