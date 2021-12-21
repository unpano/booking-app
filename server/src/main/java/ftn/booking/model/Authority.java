package ftn.booking.model;

import ftn.booking.model.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "authority")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Authority implements GrantedAuthority {

    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "User type can not be null")
    private Role name;

    @Override
    public String getAuthority() {
        return name.toString();
    }

}
