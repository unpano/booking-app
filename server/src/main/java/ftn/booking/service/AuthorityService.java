package ftn.booking.service;

import ftn.booking.model.Authority;
import ftn.booking.model.enums.Role;

import java.util.Optional;

public interface AuthorityService {
    Authority findById(Long id);
    Authority findByName(Role name);
}
