package ftn.booking.model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "adventure_actions_clients")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class AdventureActionClients {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Client client;

    @ManyToOne
    private AdventureAction action;

}
