package ftn.booking.dto;

import ftn.booking.model.Adventure;
import ftn.booking.model.Boat;
import ftn.booking.model.Client;
import ftn.booking.model.Cottage;
import ftn.booking.model.enums.ReservationType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ReservationDTO {

    private Long id;
    private ReservationType reservationType;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Long price;
    private Integer numOfPersons;
    private Boolean reported;

    private Client client;
    private Boat boat;


}
