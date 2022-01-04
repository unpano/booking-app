package ftn.booking.dto;

import ftn.booking.model.enums.Amenity;
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

    private String name;
    private String description;
    private String address;
    private String city;
    private Integer maxNumOfPersons;
    private List<Amenity> amenities;
}
