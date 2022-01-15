package ftn.booking.dto;

import ftn.booking.model.Room;
import ftn.booking.model.enums.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BoatDTO {

    private Long id;
    private String name;
    private BoatType boatType;
    private String address;
    private String description;
    private List<Amenity> amenities;
    private List<Service> additionalServices;
    private Float length;
    private Float maxSpeed;
    private Integer numberOfMotors;
    private Long motorPower;
    private Integer capacity;
    private List<NavigationEquipment> navigationEquipment;
    private List<FishingEquipment> fishingEquipment;
    private CancelationType cancelationType;

}
