package ftn.booking.repository;

import ftn.booking.model.Report;
import ftn.booking.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepository extends JpaRepository<Report, Long> {
    Report findByReservationId(Long id);
}
