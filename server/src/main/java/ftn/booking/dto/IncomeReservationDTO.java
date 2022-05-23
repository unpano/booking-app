package ftn.booking.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class IncomeReservationDTO {
    private Long id;
    private Double incomeInEuros;
    private Long actionId;
    private Long clientId;
    private LocalDateTime startTimeOfBooking;
    private LocalDateTime endTimeOfBooking;
}
