package ftn.booking.service.impl;

import ftn.booking.model.Admin;
import ftn.booking.model.AdventureActionReport;
import ftn.booking.model.Client;
import ftn.booking.model.User;
import ftn.booking.repository.AdminRepository;
import ftn.booking.repository.AdventureActionReportRepository;
import ftn.booking.repository.ClientRepository;
import ftn.booking.service.AdminService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AdminServiceImpl implements AdminService {

    private AdminRepository adminRepository;

    private AdventureActionReportRepository adventureActionReportRepository;

    private ClientRepository clientRepository;

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
}
