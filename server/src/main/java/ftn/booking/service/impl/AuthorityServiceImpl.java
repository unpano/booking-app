package ftn.booking.service.impl;

import ftn.booking.exception.NotFoundException;
import ftn.booking.model.Authority;
import ftn.booking.model.enums.Role;
import ftn.booking.repository.AuthorityRepository;
import ftn.booking.service.AuthorityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthorityServiceImpl implements AuthorityService {

    private final AuthorityRepository authorityRepository;

    @Autowired
    public AuthorityServiceImpl(AuthorityRepository authorityRepository){
        this.authorityRepository = authorityRepository;
    }

    @Override
    public Authority findById(Long id) {
        return authorityRepository.findById(id).orElseThrow(() -> new NotFoundException(id, "Role with ID: " + id + " is not found."));
    }

    @Override
    public Authority findByName(Role name) {
        return authorityRepository.findByName(name);
    }


}
