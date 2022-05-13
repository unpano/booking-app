package ftn.booking.dto;


import ftn.booking.model.AdventureAction;
import ftn.booking.model.Client;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.ManyToOne;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AdventureActionClientsDTO {
    private Long id;


    private Long clientId;


    private Long actionId;

}
