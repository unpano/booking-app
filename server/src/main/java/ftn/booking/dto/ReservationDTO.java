package ftn.booking.dto;

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

    private ReservationType reservationType;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Long price;
}
