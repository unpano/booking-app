package ftn.booking.Models;


import ftn.booking.Models.Enums.BoatType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "boat")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Boat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column
    private String address;

    @Column(name="behaviorRules")
    private String behaviorRules;

    @Column(name="cancellationConditions")
    private String cancellationConditions;

    @Column
    private Integer capacity;

    @Column(name="fishingEquipment")
    private String fishingEquipment;

    @Column
    private Long maxSpeed;

    @Column(name="motorPower")
    private Long motorPower;

    @Column
    private String description;

    @Column
    private Long numberOfMotors;

    @Column(name="rating")
    private Long rating;

    @Column
    @Enumerated(EnumType.STRING)
    private BoatType type;

    @Column
    private Long length;

    @Column
    @Enumerated(EnumType.STRING)
    private NavigationEquipment navigationEquipment;


}
