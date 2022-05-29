package ftn.booking.service.impl;

import ftn.booking.dto.IncomeReservationDTO;
import ftn.booking.model.*;
import ftn.booking.repository.*;
import ftn.booking.service.AdminService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class AdminServiceImpl implements AdminService {

    private AdminRepository adminRepository;

    private AdventureActionReportRepository adventureActionReportRepository;

    private IncomeReservationRepository incomeReservationRepository;

    private ClientRepository clientRepository;

    private UserRepository userRepository;

    @Override
    public Admin add(Admin admin) {
        return adminRepository.save(admin);

    }

    @Override
    public Boolean checkIfAdminIsFirstOrOther(String email) {
        Admin admin = adminRepository.findAdminByEmail(email);

        if (admin.getOtherAdmin().equals(Boolean.FALSE)) {
            return Boolean.FALSE;
        } else return Boolean.TRUE;
    }

    @Override
    public Boolean checkIfOtherAdminChangedPassword(String email) {
        Admin admin = adminRepository.findAdminByEmail(email);

        if (admin.getChangedPassword().equals(Boolean.TRUE)) {
            return Boolean.TRUE;
        } else return Boolean.FALSE;

    }

    @Override
    public  Boolean setApprovedPunishmentForReport(Long reportId){
        AdventureActionReport report = adventureActionReportRepository.findById(reportId).get();
        report.setApproved(Boolean.TRUE);
        adventureActionReportRepository.save(report);

        return Boolean.TRUE;

    }

    @Override
    public Boolean approvePunishmentForClientAdmin(Long clientId){
        Client client = clientRepository.findById(clientId).get();
        client.setNumOfPenalties(client.getNumOfPenalties()+1);

        clientRepository.save(client);
        return Boolean.TRUE;
    }

    @Override
    public List<IncomeReservationDTO> getAllIncomesForBookedActions(){
        List<IncomeReservation> allIncomes = incomeReservationRepository.findAll();

        List<IncomeReservationDTO> allIncomesDTO = new ArrayList<>();
        for(IncomeReservation oneIncome:allIncomes){
                IncomeReservationDTO oneIncomeDTO = new IncomeReservationDTO();
                oneIncomeDTO.setId(oneIncome.getId());
                oneIncomeDTO.setActionId(oneIncome.getAction().getId());
                oneIncomeDTO.setIncomeInEuros(oneIncome.getIncomeInEuros());
                oneIncomeDTO.setClientId(oneIncome.getClient().getId());
                oneIncomeDTO.setStartTimeOfBooking(oneIncome.getAction().getStartTime());
                oneIncomeDTO.setEndTimeOfBooking(oneIncome.getAction().getEndTime());

                allIncomesDTO.add(oneIncomeDTO);
        }

        return allIncomesDTO;
    }

    @Override
    public Double getIncomesSum(){
        List<IncomeReservation> allIncomes = incomeReservationRepository.findAll();
        Double incomeSum = 0.0;

        for(IncomeReservation income:allIncomes){
            incomeSum += income.getIncomeInEuros();
        }

        return incomeSum;
    }

    @Override
    public Boolean deleteAdmin(Long adminId){
        User admin = userRepository.findById(adminId).get();
        userRepository.delete(admin);
        return Boolean.TRUE;
    }
}
