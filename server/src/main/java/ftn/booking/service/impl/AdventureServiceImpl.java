package ftn.booking.service.impl;

import ftn.booking.dto.AdventureAdditionalServiceDTO;
import ftn.booking.dto.AdventureDTO;
import ftn.booking.dto.AdventureReservationDTO;
import ftn.booking.model.*;
import ftn.booking.repository.AdventureAdditionalServiceRepository;
import ftn.booking.repository.AdventureImagesRepository;
import ftn.booking.repository.AdventureRepository;
import ftn.booking.repository.AdventureReservationRepository;
import ftn.booking.service.AdventureService;
import lombok.AllArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class AdventureServiceImpl implements AdventureService {

    private AdventureRepository adventureRepository;

    private AdventureReservationRepository adventureReservationRepository;

    private AdventureAdditionalServiceRepository advAddServRepository;

    private AdventureImagesRepository adventureImagesRepository;

    private ModelMapper modelMapper;

    @Override

    public Adventure addAdventure(Adventure adventure) {
        return adventureRepository.save(adventure);
    }




    @Override
    public List<AdventureDTO> getAllAdventures(Long instructorId) {
        List<Adventure> allAdventures = adventureRepository.findAll();

        List<AdventureDTO> allAdventuresDTO =  new ArrayList<>();
        for(Adventure adventure: allAdventures) {
            if (adventure.getInstructor().getId().equals(instructorId)) {
                AdventureDTO adventureDTO = modelMapper.map(adventure, AdventureDTO.class);
                allAdventuresDTO.add(adventureDTO);
            }
        }
        return allAdventuresDTO;
    }


   @Override
    public String addAdventurePicture(MultipartFile file, Long adventureId) throws IOException {
        String fileName = file.getOriginalFilename();
        String pathName = "";

        String substring = fileName.substring(fileName.length() - 4);
       if(!substring.equals("jpeg"))
           pathName = generateUniqueFileName() + substring;
       else
           pathName = generateUniqueFileName() + '.' + substring;

        String filePath = System.getProperty("user.dir");
         filePath.replace("server","client");
        File outputFile = new File("/home/dejan/Desktop/isa_projekat/booking-app/client/src/assets/adventure-pictures/" + pathName);
        file.transferTo(outputFile);



        //treba ubeleziti da adventureID-ju odgovara ta slika
        AdventureImage adventureImage = new AdventureImage();
        Adventure adventure = new Adventure();
        adventure.setId(adventureId);
        adventureImage.setAdventure(adventure);
        adventureImage.setPath(pathName);

       // imageService.add(image);
        adventureImagesRepository.save(adventureImage);


        return "File uploaded: " + fileName;

    }

    @Override
    public String deleteAdventurePicture(Long pictureId) throws IOException {

        AdventureImage adventureImage = adventureImagesRepository.getById(pictureId);

        String pathName = adventureImage.getPath();

        //ovo je da bi se slika obrisala na angularu
        String filePath = System.getProperty("user.dir");
        filePath = filePath.replace("server", "client");
        File outputFile = new File("/home/dejan/Desktop/isa_projekat/booking-app/client/src/assets/adventure-pictures/" + pathName);
        boolean success = outputFile.delete();

        //treba ubeleziti da adventureID-ju odgovara ta slika

        adventureImagesRepository.delete(adventureImage);

        return "Files for adventure" + adventureImage.getAdventure().getId() +  "deleted" +  " ,deleted on Angular: " + success ;
    }

    @Override
    public List<AdventureImage> getAdventurePictures(Long adventureId){
        List<AdventureImage> alladventureImages = adventureImagesRepository.findAll();

        List<AdventureImage> adventureImages = new ArrayList<>();
        MultipartFile[] files;

        for(AdventureImage image:  alladventureImages) {
            if(image.getAdventure().getId().equals(adventureId)) {
                adventureImages.add(image);

            }
        }

        return adventureImages;


    }

    @Override
    public AdventureDTO getOneAdventure( Long adventureId){
        Adventure oneAdventure = adventureRepository.findById(adventureId).get();
        AdventureDTO oneAdventureDTO = modelMapper.map(oneAdventure,AdventureDTO.class);

        return oneAdventureDTO;
    }

    @Override
    public AdventureDTO changeOneAdventure(Adventure changedAdventure){
        Adventure adventure = adventureRepository.getById(changedAdventure.getId());
        adventure.setAddress(changedAdventure.getAddress());
        adventure.setDescription(changedAdventure.getDescription());
        adventure.setMaxNumOfPersons(changedAdventure.getMaxNumOfPersons());
        adventure.setName(changedAdventure.getName());
        adventure.setPrice(changedAdventure.getPrice());
        adventure.setEquipment(changedAdventure.getEquipment());
        adventure.setRules(changedAdventure.getRules());
        adventure.setAdditionalInfo(changedAdventure.getAdditionalInfo());
        adventure.setCancelationPrice(changedAdventure.getCancelationPrice());

        adventureRepository.save(adventure);

        return modelMapper.map(adventure,AdventureDTO.class);
    }

    @Override
    public AdventureReservationDTO addNewActionForAdventure(AdventureReservationDTO adventureReservationDTO,
                                                     Long adventureId){

        Adventure adventure = adventureRepository.findById(adventureId).get();
        AdventureReservation adventureReservation = modelMapper.map(adventureReservationDTO,AdventureReservation.class);
        adventureReservation.setAdventure(adventure);



        adventureReservationRepository.save(adventureReservation);


        return modelMapper.map(adventureReservation,AdventureReservationDTO.class);
    }

    @Override
    public List<AdventureAdditionalServiceDTO> addAdditionalServicesForAdventureAction(
            List<String> additionalServicesAdvAction,
            Long adventureReservationId){



        List<AdventureAdditionalServiceDTO> additionalServiceDTOList = new ArrayList<>();

        for(String adventureAddServ: additionalServicesAdvAction){

            AdventureReservation addReservation = new AdventureReservation();
            addReservation.setId(adventureReservationId);

            AdventureAdditionalService addService = new AdventureAdditionalService();
            addService.setAdventureReservation(addReservation);
            addService.setName(adventureAddServ);

            advAddServRepository.save(addService);
            additionalServiceDTOList.add(modelMapper.map(addService,AdventureAdditionalServiceDTO.class));

        }


        return additionalServiceDTOList;


    }


    @Override
    public List<AdventureReservationDTO> getAllActionsForAdventure(Long adventureId){
        List<AdventureReservation> allActions = adventureReservationRepository.findAll();
        List<AdventureReservationDTO> allActionsDTO = new ArrayList<>();

        for(AdventureReservation adventureReservation: allActions){
            if(adventureReservation.getAdventure().getId().equals(adventureId)){
                      allActionsDTO.add(modelMapper.map(adventureReservation,AdventureReservationDTO.class));

            }
        }

        return allActionsDTO;

    }


    @Override
    public List<AdventureAdditionalServiceDTO> getAllAdditionalServicesForReservation(Long adventureReservationId){
        List<AdventureAdditionalService> allAdditionalServices = advAddServRepository.findAll();
        List<AdventureAdditionalServiceDTO> allAdditionalServicesDTO = new ArrayList<>();

        for(AdventureAdditionalService additionalService: allAdditionalServices){
             if(additionalService.getAdventureReservation().getId().equals(adventureReservationId)){
                 allAdditionalServicesDTO.add(modelMapper.map(additionalService,AdventureAdditionalServiceDTO.class));
             }
        }
        return allAdditionalServicesDTO;
    }


    @Override
    public String deleteActionForAdventure(Long adventureReservationId){
        String success = deleteAddServices(adventureReservationId);
            AdventureReservation adventureReservation = adventureReservationRepository.findById(adventureReservationId).get();
            adventureReservationRepository.delete(adventureReservation);

            return "Action for adventure deleted: TRUE";


    }

    public String deleteAddServices(Long adventureReservationId){
        for(AdventureAdditionalService addService: advAddServRepository.findAll()){

            if(addService.getAdventureReservation().getId().equals(adventureReservationId)){

                advAddServRepository.delete(addService);
            }
        }
        return  "Add services deleted: TRUE";
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


}
