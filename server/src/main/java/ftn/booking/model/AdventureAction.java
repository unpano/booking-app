package ftn.booking.model;


import com.fasterxml.jackson.annotation.JsonFormat;
import ftn.booking.model.enums.ReservationType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Table(name = "adventure_actions")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class AdventureAction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Boolean isReserved;

    @ManyToOne
    private Adventure adventure;

    //if client is not set, then reservation is action
    //@Nullable
    //@OneToOne
    //private Client client;

    @Enumerated(EnumType.STRING)
    private ReservationType reservationType;

    @NotNull
    @JsonFormat(pattern = "YYYY-MM-dd HH:mm:ss")
    private LocalDateTime startTime;

    @NotNull
    @JsonFormat(pattern = "YYYY-MM-dd HH:mm:ss")
    private LocalDateTime endTime;

    //tacno mesto gde se rezervacija odigrava
    private String exactPlace;

    private Long numberOfBooking;


}
