package ftn.booking.model;


import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import ftn.booking.utils.UnixToLocalDateTimeConverter;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "terms")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Term {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private LocalDate date;

    @NotNull
    @JsonDeserialize(using = UnixToLocalDateTimeConverter.class)
    private LocalDateTime startTime;

    @NotNull
    @JsonDeserialize(using = UnixToLocalDateTimeConverter.class)
    private LocalDateTime endTime;

}
