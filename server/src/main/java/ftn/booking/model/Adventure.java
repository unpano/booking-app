package ftn.booking.model;
import ftn.booking.model.enums.CancelationPrice;
import ftn.booking.model.enums.InstructorEquipment;
import ftn.booking.model.enums.RulesBehavior;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "adventures")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Adventure {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Instructor instructor;

    private String name;

    private String address;

    private String description;

    private Integer maxNumOfPersons;


    @Enumerated
    @ElementCollection(targetClass = RulesBehavior.class)
    private List<RulesBehavior> rules = new ArrayList<>();

    @Enumerated
    @ElementCollection(targetClass = InstructorEquipment.class)
    private List<InstructorEquipment> equipment = new ArrayList<>();

    @Nullable
    private Integer roomNum;

    private Long price;

    @Nullable
    private Integer rate;

    private String additionalInfo;

    @Enumerated
    private CancelationPrice cancelationPrice;

}
