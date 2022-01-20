package ftn.booking.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "boat_subscription")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class BoatSubscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Boat boat;

    @ManyToOne
    private Client client;


}
