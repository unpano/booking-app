package ftn.booking.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class MarkRevisionClientDTO {
    private Long id;
    private Double mark;
    private String revisionComment;
    private Long clientId;
    private Long instructorId;
    private Boolean approvedByAdmin;
    private Boolean rejected;
}
