package ftn.booking.dto;


import ftn.booking.model.AdventureImage;
import ftn.booking.model.Instructor;
import ftn.booking.model.enums.CancelationPrice;
import ftn.booking.model.enums.InstructorEquipment;
import ftn.booking.model.enums.RulesBehavior;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AdventureDTO {

    private Long id;

    private Instructor instructor;

    private Long numberOfActions;

    private String name;

    private String address;

    private String description;

    private Integer maxNumOfPersons;

    private List<RulesBehavior> rules;
    private List<InstructorEquipment> equipment;

    private Integer roomNum;
    private Long price;
    private Integer rate;

    private String additionalInfo;

    private CancelationPrice cancelationPrice;
}
