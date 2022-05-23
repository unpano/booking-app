package ftn.booking.service;

import ftn.booking.dto.ClientDTO;
import ftn.booking.model.Client;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

public interface ClientService {
    Client add(Client client);

    List<ClientDTO> getAllClientsForAdmin();

    Boolean deleteClient(Long clientId);
}
