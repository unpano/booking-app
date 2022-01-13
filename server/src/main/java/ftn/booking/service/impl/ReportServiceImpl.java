package ftn.booking.service.impl;

import ftn.booking.model.Report;
import ftn.booking.repository.ReportRepository;
import ftn.booking.service.ReportService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ReportServiceImpl implements ReportService{

    private ReportRepository reportRepository;

    @Override
    public Boolean isReservationReported(Long id) {
        return reportRepository.findByReservationId(id) != null;
    }

    @Override
    public Report add(Report report) {
        return reportRepository.save(report);
    }
}
