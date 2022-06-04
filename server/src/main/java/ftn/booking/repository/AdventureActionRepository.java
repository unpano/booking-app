package ftn.booking.repository;

import ftn.booking.model.AdventureAction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;
import org.springframework.stereotype.Repository;

import javax.persistence.LockModeType;
import javax.persistence.QueryHint;

@Repository
public interface AdventureActionRepository extends JpaRepository<AdventureAction,Long> {

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select act from AdventureAction act where act.id = :actionId ")
    @QueryHints({@QueryHint(name = "javax.persistence.lock.timeout", value ="0")})
    AdventureAction findByIdTransactional(Long actionId);
}
