package ftn.booking.model;

import javax.persistence.*;


@Entity
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

}
