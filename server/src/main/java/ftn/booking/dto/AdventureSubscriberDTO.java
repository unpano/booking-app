package ftn.booking.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AdventureSubscriberDTO {
    private Long id;
    private Long adventureId;
    private Long clientId;
}
