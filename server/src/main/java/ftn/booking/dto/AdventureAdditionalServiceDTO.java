package ftn.booking.dto;


import ftn.booking.model.AdventureReservation;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AdventureAdditionalServiceDTO {
    private Long id;

    private String name;

    private Long  adventureReservationId;

}
