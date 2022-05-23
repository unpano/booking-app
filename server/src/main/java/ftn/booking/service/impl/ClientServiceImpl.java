package ftn.booking.service.impl;

import ftn.booking.dto.ClientDTO;
import ftn.booking.model.AdventureActionClients;
import ftn.booking.model.Client;
import ftn.booking.model.User;
import ftn.booking.model.enums.Role;
import ftn.booking.repository.AdventureActionClientsRepository;
import ftn.booking.repository.ClientRepository;
import ftn.booking.repository.UserRepository;
import ftn.booking.service.ClientService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class ClientServiceImpl implements ClientService {

    private ClientRepository clientRepository;

    private UserRepository userRepository;

    private AdventureActionClientsRepository adventureActionClientsRepository;

    private ModelMapper modelMapper;

    @Override
    public Client add(Client client) {
        return clientRepository.save(client);
    }

    @Override
    public List<ClientDTO> getAllClientsForAdmin(){
        List<Client> allClients = clientRepository.findAll();

        List<ClientDTO> allClientsDTO = new ArrayList<>();

        List<AdventureActionClients> allReservedActions = adventureActionClientsRepository.findAll();

        for(Client client: allClients){
            //za svakog klijenta treba da proverimo da li je rezervisao neku aktivnu akciju
            List<AdventureActionClients> allReservedActiveActionsClient = new ArrayList<>();

            for(AdventureActionClients oneAction:allReservedActions){
                Boolean isThatClient = oneAction.getClient().getId().equals(client.getId());
                int comparation = oneAction.getAction().getEndTime().compareTo(LocalDateTime.now());

                if(isThatClient.equals(Boolean.TRUE) && comparation >=0 ){
                    allReservedActiveActionsClient.add(oneAction);
                }

            }

            if(allReservedActiveActionsClient.isEmpty()){
                ClientDTO clientDTO = new ClientDTO();
                clientDTO = modelMapper.map(client,ClientDTO.class);
                clientDTO.setCanBeDeleted(Boolean.TRUE);
                clientDTO.setUserType(Role.ROLE_CLIENT);
                allClientsDTO.add(clientDTO);

            } else{
                ClientDTO clientDTO = new ClientDTO();
                clientDTO = modelMapper.map(client,ClientDTO.class);
                clientDTO.setCanBeDeleted(Boolean.FALSE );
                clientDTO.setUserType(Role.ROLE_CLIENT);
                allClientsDTO.add(clientDTO);
            }

        }

        return allClientsDTO;
    }

    @Override
    public Boolean deleteClient(Long clientId){
        User client = userRepository.findById(clientId).get();
        userRepository.delete(client);
        return Boolean.TRUE;

    }
}
