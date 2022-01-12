package ftn.booking.service.impl;

import ftn.booking.model.Client;
import ftn.booking.repository.ClientRepository;
import ftn.booking.service.ClientService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ClientServiceImpl implements ClientService {

    private ClientRepository clientRepository;

    @Override
    public Client add(Client client) {
        return clientRepository.save(client);
    }
}
