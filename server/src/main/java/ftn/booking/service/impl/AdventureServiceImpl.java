package ftn.booking.service.impl;

import ftn.booking.dto.AdventureDTO;
import ftn.booking.dto.UserDTO;
import ftn.booking.model.Adventure;
import ftn.booking.model.User;
import ftn.booking.model.enums.Role;
import ftn.booking.repository.AdventureRepository;
import ftn.booking.service.AdventureService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class AdventureServiceImpl implements AdventureService {

    private AdventureRepository adventureRepository;

    private ModelMapper modelMapper;

    @Override

    public Adventure addAdventure(Adventure adventure) {
        return adventureRepository.save(adventure);
    }

    @Override
    public List<AdventureDTO> getAllAdventures() {
        List<Adventure> allAdventures = adventureRepository.findAll();

        List<AdventureDTO> allAdventuresDTO =  new ArrayList<>();
        for(Adventure adventure: allAdventures) {
                    AdventureDTO adventureDTO = modelMapper.map(adventure,AdventureDTO.class);
                    allAdventuresDTO.add(adventureDTO);
        }

        return allAdventuresDTO;
    }
}
