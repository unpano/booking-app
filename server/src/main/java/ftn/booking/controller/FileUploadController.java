package ftn.booking.controller;

import ftn.booking.model.User;
import ftn.booking.service.StorageService;
import ftn.booking.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;

@RestController
@AllArgsConstructor
@RequestMapping(value = "/uploads")
public class FileUploadController {

    private StorageService storageService;
    private UserService userService;

    @PostMapping("/set-profile-picture")
    @PreAuthorize("hasRole('COTTAGE_OWNER')")
    public ResponseEntity<String> addProfilePicture(@RequestParam("file") MultipartFile file, Principal loggedUser) throws IOException {
        return new ResponseEntity<>(storageService.setProfilePicture(file, loggedUser.getName()), HttpStatus.OK);
    }

    @PostMapping("/add-cottage-picture/{cottageId}")
    @PreAuthorize("hasRole('COTTAGE_OWNER')")
    public ResponseEntity<String> addCottagePicture(@RequestParam("file") MultipartFile file,
                                                    @PathVariable Long cottageId) throws IOException {
        return new ResponseEntity<>(storageService.addCottagePicture(file, cottageId), HttpStatus.OK);
    }
}
