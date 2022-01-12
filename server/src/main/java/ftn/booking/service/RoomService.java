package ftn.booking.service;

import ftn.booking.model.Room;

import java.util.Optional;

public interface RoomService {
    Room addRoom(Room room);

    Optional<Room> findById(Long roomId);

    void delete(Room room);

}
