package ftn.booking.model;

import ftn.booking.model.enums.ReservationType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "action")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Action {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime startDate;

    private LocalDateTime endDate;
    
    private  Long oldPrice;

    private Long price;

    private Boolean taken;

    private Integer maxNumberOfPersons;

    @NotNull
    @Enumerated(EnumType.STRING)
    private ReservationType reservationType;

    @ManyToOne
    private Boat boat;

    @ManyToOne
    private Cottage cottage;

    @ManyToOne
    private Adventure adventure;

    @ManyToMany(fetch = FetchType.LAZY)
    private List<AdditionalService> boatAdditionalServices = new ArrayList<>();

}
