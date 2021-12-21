package ftn.booking.model;
import ftn.booking.model.enums.ReservationType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.*;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "reservations")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String place;

    @NotNull
    private LocalDateTime date;

    @NotNull
    private Integer duration;

    @NotNull
    private Integer maxPerson;

    private Long price;

    private Boolean status;

    private String report;

    private String comment;

    private String praise;

    @NotNull
    @Enumerated(EnumType.STRING)
    private ReservationType reservationType;

    @OneToOne
    private User user;

    @OneToOne
    private Boat boat;

    @OneToOne
    private Cottage cottage;


}
