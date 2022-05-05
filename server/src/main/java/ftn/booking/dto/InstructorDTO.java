package ftn.booking.dto;

import ftn.booking.model.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InstructorDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String address;
    private String city;
    private String country;
    private String phoneNumber;
    private Role userType;
    private String reason;
}
