package ftn.booking.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BoatDTO {
    private Long id;
    private String address;
    private String behaviorRules;
    private String cancellationConditions;
    private Integer capacity;
    private String fishingEquipment;
    private Long maxSpeed;
    private Long motorPower;
    private String description;
    private Long numberOfMotors;
    private Long rating;
    private String type;
    private Long length;
    private String name;

}
