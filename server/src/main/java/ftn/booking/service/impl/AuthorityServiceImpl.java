package ftn.booking.service.impl;

import ftn.booking.exception.NotFoundException;
import ftn.booking.model.Authority;
import ftn.booking.model.enums.Role;
import ftn.booking.repository.AuthorityRepository;
import ftn.booking.service.AuthorityService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthorityServiceImpl implements AuthorityService {

    private final AuthorityRepository authorityRepository;

    @Override
    public Authority findById(Long id) {
        return authorityRepository.findById(id).orElseThrow(() -> new NotFoundException(id, "Role with ID: " + id + " is not found."));
    }

    @Override
    public Authority findByName(Role name) {
        return authorityRepository.findByName(name);
    }


}
