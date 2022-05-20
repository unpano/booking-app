package ftn.booking.service;

import ftn.booking.model.Admin;
import org.springframework.web.bind.annotation.PathVariable;

public interface AdminService {
    Admin add(Admin admin);

    Boolean checkIfAdminIsFirstOrOther(String email);

    Boolean checkIfOtherAdminChangedPassword(String email);
}
