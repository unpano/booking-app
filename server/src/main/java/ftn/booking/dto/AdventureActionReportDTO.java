package ftn.booking.dto;

import ftn.booking.model.AdventureActionClients;
import ftn.booking.model.Client;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.OneToOne;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class AdventureActionReportDTO {
    private Long id;

    private String comment;

    //if approved and punishClient are true directly increase client penalties by 1 (client did not show up)
    //else admin will decide if he wants to punish client
    private Boolean punishClient;

    //admin approves it if feedback was bad
    private Boolean approved;


    private Long clientId;


    private Long actionReservationId;


}
