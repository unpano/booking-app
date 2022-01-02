package ftn.booking.service.impl;
import ftn.booking.exception.NotFoundException;
import ftn.booking.model.Cottage;
import ftn.booking.repository.CottageRepository;
import ftn.booking.service.CottageService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CottageServiceImpl implements CottageService {

    private CottageRepository cottageRepository;

    @Override
    public List<Cottage> findAll()
    {
        return cottageRepository.findAll();
    }

    @Override
    public Cottage findOne(Long id)
    {
        return cottageRepository.findById(id).get();
    }

    public List<Cottage> findAllOwnerCottages(Long id) {
        return cottageRepository.findAllByCottageOwnerId(id);
    }

    @Override
    public Cottage findById(Long cottageId)
    {
        Optional<Cottage> cottage = cottageRepository.findById(cottageId);

        if(cottage.isEmpty())
            throw new NotFoundException("Cottage does not exist.");

        return cottage.get();
    }

    @Override
    public Cottage add(Cottage cottage) {
        return cottageRepository.save(cottage);
    }
}
