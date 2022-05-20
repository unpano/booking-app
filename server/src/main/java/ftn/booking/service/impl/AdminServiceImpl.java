package ftn.booking.service.impl;

import ftn.booking.model.Admin;
import ftn.booking.repository.AdminRepository;
import ftn.booking.service.AdminService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AdminServiceImpl implements AdminService {

    private AdminRepository adminRepository;

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
}
