package ftn.booking.model;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

    private String name;

    private String description;

    private Integer maxNumOfPersons;

    private Long price;

    private String rules;

    private Integer rate;

    @ManyToOne
    private Instructor instructor;

    @OneToMany
    private List<EntityImage> images = new ArrayList<>();

}
