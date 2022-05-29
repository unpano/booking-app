package ftn.booking.model;


import ftn.booking.model.enums.Status;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@Setter
@Table(name = "deactivation_requests")
@NoArgsConstructor
@AllArgsConstructor
public class DeactivationRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String description;

    @Enumerated(EnumType.STRING)
    private Status status;


    private Long userId;

    private String firstNameUser;

    private String lastNameUser;

    private String emailUser;

    private String roleUser;
}
