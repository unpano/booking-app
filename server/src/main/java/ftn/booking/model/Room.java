package ftn.booking.model;

import ftn.booking.model.enums.RoomType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "rooms")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    //type and number of beds
    private String bedTypes;

}
