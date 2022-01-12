package ftn.booking.repository;


import ftn.booking.model.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User,Long> {

    User findByEmail(String username);
}
