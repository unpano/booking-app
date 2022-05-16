package ftn.booking.model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "instructor_available_period")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class InstructorAvailablePeriod {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long instructorId;

    private LocalDateTime startTimeAvailable;

    private LocalDateTime endTimeAvailable;

}
