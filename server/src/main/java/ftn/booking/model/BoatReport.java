package ftn.booking.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "boat_reports")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class BoatReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long averageRate;

    private Long revenue;

    @OneToOne
    @NotNull
    private Boat boat;

    ///graph;
}
