package ftn.booking.service;

import ftn.booking.model.Authority;

import java.util.Optional;

public interface AuthorityService {
    Authority findById(Long id);
    Authority findByName(String name);
}
