package ftn.booking.repository;

import ftn.booking.model.InstructorAvailablePeriod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InstructorAvailablePeriodRepository extends JpaRepository<InstructorAvailablePeriod,Long> {

}
