package ftn.booking.model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "adventure_reservation_additional_services")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class AdventureAdditionalService {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne
    private AdventureReservation adventureReservation;

}
