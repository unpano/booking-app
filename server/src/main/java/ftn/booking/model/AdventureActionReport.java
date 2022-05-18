package ftn.booking.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;


@Entity
@Table(name = "adventure_actions_reports")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class AdventureActionReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String comment;

    //if approved and punishClient are true directly increase client penalties by 1 (client did not show up)
    //else admin will decide if he wants to punish client
    private Boolean punishClient;

    //admin approves it if feedback was bad
    private Boolean approved;


    @OneToOne
    private Client client;

    @OneToOne
    private AdventureActionClients actionReservation;
}
