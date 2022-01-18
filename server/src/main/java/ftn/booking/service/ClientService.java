package ftn.booking.service;

import ftn.booking.model.Client;

public interface ClientService {
    Client findClientById(Long id);
    Client add(Client client);
}
