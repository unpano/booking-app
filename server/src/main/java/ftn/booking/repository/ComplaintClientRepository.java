package ftn.booking.repository;

import ftn.booking.model.ComplaintClient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;

import javax.persistence.LockModeType;
import javax.persistence.QueryHint;

public interface ComplaintClientRepository extends JpaRepository<ComplaintClient,Long> {
    ComplaintClient findByClientIdAndInstructorId(Long clientId,Long instructorId);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select com from ComplaintClient com where com.client.id = :clientId and com.instructor.id= :instructorId and com.response_admin='' ")
    @QueryHints({@QueryHint(name = "javax.persistence.lock.timeout", value ="0")})
    ComplaintClient findByClientIdAndInstructorIdTransactional(Long clientId,Long instructorId);
}
