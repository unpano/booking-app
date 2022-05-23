package ftn.booking.service.impl;

import ftn.booking.dto.BoatDTO;
import ftn.booking.dto.BoatOwnerDTO;
import ftn.booking.model.Boat;
import ftn.booking.model.Reservation;
import ftn.booking.model.User;
import ftn.booking.model.enums.Role;
import ftn.booking.repository.BoatRepository;
import ftn.booking.repository.ReservationRepository;
import ftn.booking.repository.UserRepository;
import ftn.booking.service.BoatService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class BoatServiceImpl implements BoatService {

    BoatRepository boatRepository;
    ReservationRepository reservationRepository;

    private UserRepository userRepository;

    @Override
    public List<Boat> findAll()
    {
        return boatRepository.findAll();
    }

    @Override
    public Boat findById(Long id)
    {
        return boatRepository.findById(id).get();
    }

    @Override
    public List<Boat> findFreeBoats(LocalDateTime startTime, LocalDateTime endTime)
    {
        List<Boat> resultBoats = new ArrayList<>();
        List<Boat> allBoats = boatRepository.findAll();
        List<Reservation> reservations = reservationRepository.findAllByReservationTypeAndStartTimeAndEndTime
                ("BOAT", startTime, endTime);

        for (Boat boat : allBoats)
        {
            Boolean taken = false;
            for (Reservation res : reservations)
            {
                if( res.getBoat() == boat)
                {
                    taken = true;
                }
            }
            if( taken == false)
            {
                resultBoats.add(boat);
            }

        }

        return resultBoats;
    }

    @Override
    public List<BoatOwnerDTO> getAllBoatOwner(){
        List<User> allUser = userRepository.findAll();

        List<BoatOwnerDTO> boatOwnersDTO = new ArrayList<>();

        for(User user:allUser){
            if(user.getRole().equals(Role.ROLE_BOAT_OWNER)){
                BoatOwnerDTO boatOwnerDTO = new BoatOwnerDTO();
                boatOwnerDTO.setId(user.getId());
                boatOwnerDTO.setFirstName(user.getFirstName());
                boatOwnerDTO.setLastName(user.getLastName());
                boatOwnerDTO.setEmail(user.getEmail());
                boatOwnerDTO.setUserType(user.getRole());
                boatOwnerDTO.setAddress(user.getAddress());
                boatOwnerDTO.setCity(user.getCity());
                boatOwnerDTO.setCountry(user.getCountry());

                boatOwnersDTO.add(boatOwnerDTO);
            }
        }

        return boatOwnersDTO;
    }

    @Override
    public Boolean deleteBoatOwner(Long boatOwnerId){
        User boatOwner = userRepository.findById(boatOwnerId).get();
        userRepository.delete(boatOwner);
        return Boolean.TRUE;

    }

    @Override
    public List<BoatDTO> getAllBoatsForAdmin(){
        List<BoatDTO> allBoatsDTO = new ArrayList<>();
        List<Boat> allBoats = boatRepository.findAll();

        for(Boat boat:allBoats){
            BoatDTO boatDTO = new BoatDTO();
            boatDTO.setId(boat.getId());
            boatDTO.setAddress(boat.getAddress());
            boatDTO.setBehaviorRules(boat.getBehaviorRules());
            boatDTO.setCancellationConditions(boat.getCancellationConditions());
            boatDTO.setCapacity(boat.getCapacity());
            boatDTO.setDescription(boat.getDescription());
            boatDTO.setLength(boat.getLength());
            boatDTO.setName(boat.getName());
            allBoatsDTO.add(boatDTO);
        }

        return allBoatsDTO;
    }

    @Override
    public Boolean deleteBoatByAdmin(Long boatId){
        Boat boat = boatRepository.findById(boatId).get();
        boatRepository.delete(boat);
        return Boolean.TRUE;
    }
}
