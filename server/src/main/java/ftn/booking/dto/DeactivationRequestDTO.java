package ftn.booking.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class DeactivationRequestDTO {
    private Long id;
    private String description;
    private String status;
    private Long userId;
    private String firstNameUser;
    private String lastNameUser;
    private String emailUser;
    private String roleUser;
}
