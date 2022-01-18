package ftn.booking.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "entity_images")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class EntityImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String path;

    @ManyToOne
    private Boat boat;

    @ManyToOne
    private Cottage cottage;

    @ManyToOne
    private Adventure adventure;
}


