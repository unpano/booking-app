package ftn.booking.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

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

}
