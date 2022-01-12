package ftn.booking.service;

import ftn.booking.model.Report;

public interface ReportService {
    Boolean isReservationReported(Long id);

    Report add(Report report);
}
