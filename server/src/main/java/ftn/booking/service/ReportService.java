package ftn.booking.service;

import ftn.booking.dto.HasRevisionMarkDTO;
import ftn.booking.dto.InstructorDTO;
import ftn.booking.dto.MarkRevisionClientDTO;
import ftn.booking.model.Report;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface ReportService {
    Boolean isReservationReported(Long id);

    Report add(Report report);

    MarkRevisionClientDTO addNewMarkRevisionClient(MarkRevisionClientDTO markRevisionDTO);

    List<InstructorDTO> getAllInstructorForRevisionAndMark(Long clientId);

    Boolean checkIfInstructorHasRevisionFromClient(Long clientId,
                                                   Long instructorId);

    MarkRevisionClientDTO getMarkRevisionClientForInstructor(Long clientId,
                                                              Long instructorId);
}
