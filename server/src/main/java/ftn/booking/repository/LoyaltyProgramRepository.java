package ftn.booking.repository;

import ftn.booking.model.LoyaltyProgram;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoyaltyProgramRepository extends JpaRepository<LoyaltyProgram,Long> {
    LoyaltyProgram findByLoyaltyCategoryAndAndUserType(String loyaltyCategory,String userType);
}
