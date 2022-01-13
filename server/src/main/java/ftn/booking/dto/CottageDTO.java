package ftn.booking.dto;

import ftn.booking.model.Room;
import ftn.booking.model.enums.Amenity;
import ftn.booking.model.enums.Service;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CottageDTO {

    private Long id;
    private String name;
    private String description;
    private String address;
    private String city;
    private Integer maxNumOfPersons;
    private List<Amenity> amenities;
    private List<Service> additionalServices;
    private List<Room> rooms;
    private Float oneDayPrice;
}
