package ftn.booking.model;


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

    private String rate;

    private String description;

    @NotNull
    private Integer bedNum;

    private Integer roomNum;

    private String behaviorRules;

    private Long prices;

    @ManyToOne
    private CottageOwner cottageOwner;

    ///pictures

    private int maxNumOfPersons;

}
