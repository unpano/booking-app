package ftn.booking.service;

import ftn.booking.dto.IncomeReservationDTO;
import ftn.booking.model.Admin;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

public interface AdminService {
    Admin add(Admin admin);

    Boolean checkIfAdminIsFirstOrOther(String email);

    Boolean checkIfOtherAdminChangedPassword(String email);

    Boolean setApprovedPunishmentForReport(Long reportId);

    Boolean approvePunishmentForClientAdmin(Long clientId);

    List<IncomeReservationDTO> getAllIncomesForBookedActions();

    Double getIncomesSum();
}
