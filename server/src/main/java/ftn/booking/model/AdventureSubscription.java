package ftn.booking.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "adventure_subscription")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class AdventureSubscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Adventure adventure;

    @ManyToOne
    private Client client;


}
