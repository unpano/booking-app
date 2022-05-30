package ftn.booking.repository;

import ftn.booking.model.IncomeReservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IncomeReservationRepository extends JpaRepository<IncomeReservation,Long> {
    IncomeReservation findByActionIdAndClientId(Long actionId,Long clientId);
}
