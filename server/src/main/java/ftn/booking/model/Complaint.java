package ftn.booking.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;


@Entity
@Setter
@Getter
public class Complaint {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String content;

    @ManyToOne
    private Client client;

    @ManyToOne
    private User user;

    @ManyToOne
    private Boat boat;

    @ManyToOne
    private Cottage cottage;

    @ManyToOne
    private Adventure adventure;


}
