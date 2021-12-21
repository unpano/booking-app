package ftn.booking.repository;

import ftn.booking.model.Authority;
import ftn.booking.model.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorityRepository extends JpaRepository<Authority, Long> {
    Authority findByName(Role name);
}
