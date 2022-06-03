package ftn.booking.service;

import ftn.booking.dto.*;
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

    List<MarkRevisionClientDTO> getAllNotApprovedMarksRevisions();

    List<MarkRevisionClientDTO> getAllApprovedMarksRevisions();

    Boolean approveRevisionForInstructor(Long revisionId);

    Boolean rejectRevisionForInstructor(Long revisionId);

    ComplaintClientDTO addComplaintForInstructor(ComplaintClientDTO complaintClientDTO);

    ComplaintClientDTO getComplaint(Long clientId,
                                    Long instructorId);

    List<ComplaintClientDTO> getAllComplaintsFromClientsForInstructors();

    Boolean replyToComplaintAdmin(ComplaintClientDTO replyComplaint);

    Boolean checkIfExistComplaint(Long clientId,
                                  Long instructorId);

    Boolean checkIfComplaintHasAdminResponse(Long clientId,
                                              Long instructorId);
}
