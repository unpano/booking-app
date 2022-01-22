package ftn.booking.model;

import ftn.booking.model.enums.ReservationType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "additional_services")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class AdditionalService {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;

    private String info;

    private String name;

    private Long price;

    @NotNull
    @Enumerated(EnumType.STRING)
    private ReservationType reservationType;

    @ManyToOne
    private Boat boat;

    @ManyToOne
    private Cottage cottage;

    @ManyToOne
    private Adventure adventure;

}
