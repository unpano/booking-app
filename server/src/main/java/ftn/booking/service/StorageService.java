package ftn.booking.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

public interface StorageService {
    String setProfilePicture(MultipartFile file, String username) throws IOException;
    String upload(File file);
    String deleteFile(String fileName);

    String addCottagePicture(MultipartFile file, Long cottageId) throws IOException;
}
