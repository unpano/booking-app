package ftn.booking.Models;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "cottage")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Cottage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column
    private String address;

    @Column
    private String rate;

    @Column
    private String description;

    @Column
    private Integer bedNum;

    @Column
    private Integer roomNum;

    @Column
    private String behaviorRules;

    @Column
    private Long prices;




}
