package ftn.booking.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import ftn.booking.model.AdditionalService;
import ftn.booking.model.Adventure;
import ftn.booking.model.AdventureAdditionalService;
import ftn.booking.model.Client;
import ftn.booking.model.enums.ReservationType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AdventureReservationDTO {

    private Long id;

    private Adventure adventure;

    //if client is not set, then reservation is action
   // private Client client;


    private ReservationType reservationType;

    private LocalDateTime startTime;

    private LocalDateTime endTime;


    //tacno mesto gde se rezervacija odigrava
    private String exactPlace;



}
