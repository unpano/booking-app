package ftn.booking.Models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;


@Entity
@Table(name = "additional_cottage_service")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class AdditionalCottageService {

    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "info")
    private String info;

    @Column(name = "name")
    private String name;

    @Column(name = "price")
    private Long price;


}
