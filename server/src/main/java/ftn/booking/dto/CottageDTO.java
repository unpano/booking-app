package ftn.booking.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
}
