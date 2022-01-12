package ftn.booking.dto;

import ftn.booking.model.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class LoginDTO {

    private String access_token;

    private Long expires_in;

    private Role role;

    private Long userId;

    private String email;

    private String picture;

}

