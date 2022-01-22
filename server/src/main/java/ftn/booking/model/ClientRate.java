package ftn.booking.model;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Setter
@Getter
public class ClientRate {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer rate;

    private String review;

    @ManyToOne
    private Client client;

    @ManyToOne
    private Boat boat;

    @ManyToOne
    private Cottage cottage;

    @ManyToOne
    private Adventure adventure;


}
