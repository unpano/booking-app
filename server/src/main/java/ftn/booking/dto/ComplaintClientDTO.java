package ftn.booking.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ComplaintClientDTO {
    private Long id;
    private String complaint_comment;
    private String response_admin;
    private Long client_id;
    private Long instructor_id;
}
