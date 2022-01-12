package ftn.booking.service.impl;

import ftn.booking.model.Cottage;
import ftn.booking.model.Image;
import ftn.booking.model.User;
import ftn.booking.service.ImageService;
import ftn.booking.service.StorageService;
import ftn.booking.service.UserService;
import lombok.AllArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@Service
@AllArgsConstructor
public class StorageServiceImpl implements StorageService {

    private static final Logger logger = LoggerFactory.getLogger(StorageServiceImpl.class);
    private UserService userService;
    private ImageService imageService;

    @Override
    public String setProfilePicture(MultipartFile file, String username) throws IOException{

        String fileName = file.getOriginalFilename();
        String filePath = System.getProperty("user.dir");
        filePath = filePath.replace("server","client");

        String pathName = "";
        String substring = fileName.substring(fileName.length() - 4);
        if(!substring.equals("jpeg"))
            pathName = username + substring;
        else
            pathName = username + '.' + substring;

        File outputFile = new File(filePath + "\\src\\assets\\profile-pictures\\" + pathName);
        
        file.transferTo(outputFile);

        User user = userService.loadUserByUsername(username);

        user.setPicture("..\\assets\\profile-pictures\\" + pathName);
        userService.updateUser(user);

        return "File uploaded: " + fileName;
    }

    @Override
    public String upload(File file) {
        String fileName = file.getName();
        //s3Client.putObject(new PutObjectRequest(bucketName, fileName, file).withCannedAcl(CannedAccessControlList.PublicRead));
        file.delete();
        return "File uploaded: " + fileName;
    }

    @Override
    public String deleteFile(String fileName) {
        //s3Client.deleteObject(bucketName,fileName);
        return fileName + "removed...";
    }

    @Override
    public String addCottagePicture(MultipartFile file, Long cottageId) throws IOException {
        String fileName = file.getOriginalFilename();
        String pathName = "";

        String substring = fileName.substring(fileName.length() - 4);
        if(!substring.equals("jpeg"))
            pathName = generateUniqueFileName() + substring;
        else
            pathName = generateUniqueFileName() + '.' + substring;

        String filePath = System.getProperty("user.dir");
        filePath = filePath.replace("server","client");
        File outputFile = new File(filePath + "\\src\\assets\\cottage-pictures\\" + pathName);
        file.transferTo(outputFile);

        //treba ubeleziti da cottageId-ju odgovara ta slika
        Image image = new Image();
        Cottage cottage = new Cottage();
        cottage.setId(cottageId);
        image.setCottage(cottage);
        image.setPath(pathName);

        imageService.add(image);


        return "File uploaded: " + fileName;

    }

    String generateUniqueFileName() {
        String filename = "";
        long millis = System.currentTimeMillis();
        String datetime = new Date().toString();
        datetime = datetime.replace(" ", "");
        datetime = datetime.replace(":", "");
        String rndchars = RandomStringUtils.randomAlphanumeric(8);
        filename = rndchars + "_" + datetime + "_" + millis;
        return filename;
    }

    private File convertMultiPartFileToFile(MultipartFile file) {
        File convertedFile = new File(file.getOriginalFilename());
        try (FileOutputStream fos = new FileOutputStream(convertedFile)) {
            fos.write(file.getBytes());
        } catch (IOException e) {
            logger.error("Error converting multipartFile to File: {}", e.getMessage());
        }
        return convertedFile;
    }
}
