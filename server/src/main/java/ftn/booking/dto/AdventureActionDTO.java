package ftn.booking.dto;

import ftn.booking.model.Adventure;
import ftn.booking.model.enums.ReservationType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AdventureActionDTO {

    private Long id;

    private Boolean isReserved;

    private Adventure adventure;

    //if client is not set, then reservation is action
   // private Client client;


    private ReservationType reservationType;

    private LocalDateTime startTime;

    private LocalDateTime endTime;


    //tacno mesto gde se rezervacija odigrava
    private String exactPlace;

    private List<String> additionalAdvServices;



}
