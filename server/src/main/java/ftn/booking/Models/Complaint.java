package ftn.booking.Models;

import javax.persistence.*;


@Entity
public class Complaint {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String content;

    @ManyToOne
    private User user;

    @ManyToOne
    private Instructor instructor;

    @ManyToOne
    private CottageOwner cottageOwner;

    @ManyToOne
    private BoatOwner boatOwner;

    ///User

    public Complaint() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
