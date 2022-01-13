package ftn.booking.service.impl;

import ftn.booking.model.Room;
import ftn.booking.repository.RoomRepository;
import ftn.booking.service.RoomService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class RoomServiceImpl implements RoomService {
    private RoomRepository roomRepository;

    @Override
    public Room addRoom(Room room) {
        return roomRepository.save(room);
    }

    @Override
    public Optional<Room> findById(Long roomId) {
        return roomRepository.findById(roomId);
    }

    @Override
    public void delete(Room room) {
        roomRepository.delete(room);
    }
}
