package ftn.booking.service.impl;
import ftn.booking.dto.CottageDTO;
import ftn.booking.dto.CottageOwnerDTO;
import ftn.booking.dto.ReservationDTO;
import ftn.booking.exception.NotFoundException;
import ftn.booking.model.*;
import ftn.booking.model.enums.Role;
import ftn.booking.repository.CottageRepository;
import ftn.booking.repository.ImageRepository;
import ftn.booking.repository.ReservationRepository;
import ftn.booking.repository.UserRepository;
import ftn.booking.service.CottageService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CottageServiceImpl implements CottageService {

    private CottageRepository cottageRepository;
    private ReservationRepository reservationRepository;

    private UserRepository userRepository;

    private ImageRepository imageRepository;

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

    @Override
    public List<Cottage> findFreeCottages(ReservationDTO reservationDTO) {
        List<Cottage> resultCottages = new ArrayList<>();
        List<Cottage> allCottages = cottageRepository.findAll();
        List<Reservation> reservations = reservationRepository.findAllByReservationTypeAndStartTimeAndEndTime
                ("COTTAGE", reservationDTO.getStartTime(), reservationDTO.getEndTime());

        for (Cottage cottage : allCottages) {
            Boolean taken = false;
            for (Reservation res : reservations) {
                if (res.getCottage() == cottage) {
                    taken = true;
                }
            }
            if (taken == false) {
                resultCottages.add(cottage);
            }

        }

        return resultCottages;
    }
    public void delete(Cottage cottage) {
        cottageRepository.delete(cottage);
    }

    @Override
    public Cottage update(Cottage cottage) {
        return cottageRepository.save(cottage);
    }

    @Override
    public List<CottageOwnerDTO> getAllCottageOwners(){
        List<CottageOwnerDTO> allCottageOwners = new ArrayList<>();

        List<User> allUsers = userRepository.findAll();

        for(User user:allUsers){
            if(user.getRole().equals(Role.ROLE_COTTAGE_OWNER)){
                CottageOwnerDTO cottageOwnerDTO = new CottageOwnerDTO();
                cottageOwnerDTO.setId(user.getId());
                cottageOwnerDTO.setFirstName(user.getFirstName());
                cottageOwnerDTO.setLastName(user.getLastName());
                cottageOwnerDTO.setEmail(user.getEmail());
                cottageOwnerDTO.setUserType(user.getRole());
                cottageOwnerDTO.setAddress(user.getAddress());
                cottageOwnerDTO.setCity(user.getCity());
                cottageOwnerDTO.setCountry(user.getCountry());


                List<Cottage> allCotagesForOwner = cottageRepository.findAllByCottageOwnerId(user.getId());
                if(allCotagesForOwner.isEmpty()){
                        cottageOwnerDTO.setCanBeDeleted(Boolean.TRUE);
                } else{
                        cottageOwnerDTO.setCanBeDeleted(Boolean.FALSE);
                }
                allCottageOwners.add(cottageOwnerDTO);
            }
        }
        return allCottageOwners;

    }

    @Override
    public Boolean deleteCottageOwner(Long cottageOwnerId){
        User cottageOwner = userRepository.findById(cottageOwnerId).get();
        userRepository.delete(cottageOwner);
        return Boolean.TRUE;

    }

    @Override
    public List<CottageDTO> getAllCottagesForAdmin(){
        List<CottageDTO> allCottagesDTO = new ArrayList<>();

        List<Cottage> allCottages = cottageRepository.findAll();

        for(Cottage cottage:allCottages){
            CottageDTO cottageDTO = new CottageDTO();
            cottageDTO.setId(cottage.getId());
            cottageDTO.setAddress(cottage.getAddress());
            cottageDTO.setCity(cottage.getCity());
            cottageDTO.setDescription(cottage.getDescription());
            cottageDTO.setMaxNumOfPersons(cottage.getMaxNumOfPersons());
            cottageDTO.setName(cottage.getName());
            cottageDTO.setOneDayPrice(cottage.getOneDayPrice());
            cottageDTO.setRate(cottage.getRate());
            cottageDTO.setCottageOwnerId(cottage.getCottageOwner().getId());
            allCottagesDTO.add(cottageDTO);
        }

        return allCottagesDTO;
    }

    @Override
    public Boolean deleteCottage(Long cottageId){
        List<Image> imagesCottages = imageRepository.findAllByCottageId(cottageId);
        for(Image imageCottage:imagesCottages){
            imageRepository.delete(imageCottage);
        }

        List<Image> imagesCottages2 = imageRepository.findAllByCottageId(cottageId);
        if(imagesCottages2.isEmpty()) { // ako smo izbrisali sve slike vezane za tu vikendicu
            Cottage cottage = cottageRepository.findById(cottageId).get();
            cottageRepository.delete(cottage);
            return Boolean.TRUE;
        } else return Boolean.FALSE;

    }
}
