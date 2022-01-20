package ftn.booking.service;

import ftn.booking.model.Action;

import java.util.List;

public interface ActionService {

    List<Action> findAll();

    List<Action> findByEntityId(Long id);

    void delete(Long actionId);
}
