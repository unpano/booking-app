package ftn.booking.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ReportDTO {
    private Long reservationId;
    private String comment;
    private Boolean approved;
    private Boolean punishClient;
}
