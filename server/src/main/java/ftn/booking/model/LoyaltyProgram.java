package ftn.booking.model;

import ftn.booking.model.enums.LoyaltyCategory;
import ftn.booking.model.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "admin_loyalty_program")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class LoyaltyProgram {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Role user_type;

    private Long loyalty_points;

    private LoyaltyCategory loyaltyCategory;
}
