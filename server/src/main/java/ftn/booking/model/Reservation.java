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
    @Enumerated(EnumType.STRING)
    private ReservationType reservationType;

    @NotNull
    private LocalDateTime startTime;

    @NotNull
    private LocalDateTime endTime;

    private Long price;

    //private Boolean status;

    //private String report;

    //private String comment;


//    @NotNull
//    private String place;

//    //Sta je ovo??
//    private String praise;

    //private Boolean isReportFilled;

    //if client is not set, then reservation is action
    @OneToOne
    private Client client;

    @OneToOne
    private Boat boat;

    @OneToOne
    private Cottage cottage;

    @OneToOne
    private Adventure adventure;
}
