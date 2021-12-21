package ftn.booking.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "reports")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long averageRate;

    private Long revenue;

    ///onaj ko pise izvestaj
    @OneToOne
    private User user;

    @OneToOne
    private Boat boat;

    @OneToOne
    private Cottage cottage;

    @OneToOne
    private Client client;


}
