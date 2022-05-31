package ftn.booking.service;

import ftn.booking.dto.IncomeReservationDTO;
import ftn.booking.model.Admin;
import ftn.booking.model.LoyaltyProgram;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface AdminService {
    Admin add(Admin admin);

    Boolean checkIfAdminIsFirstOrOther(String email);

    Boolean checkIfOtherAdminChangedPassword(String email);

    Boolean setApprovedPunishmentForReport(Long reportId);

    Boolean approvePunishmentForClientAdmin(Long clientId);

    List<IncomeReservationDTO> getAllIncomesForBookedActions();

    Double getIncomesSum();

    Boolean deleteAdmin(Long adminId);

    List<LoyaltyProgram> getAllLoyaltyPrograms();

    LoyaltyProgram getOneLoyaltyProgram(Long loyaltyProgramId);

    Boolean changeOneLoyaltyProgram(LoyaltyProgram changedProgram);
}
