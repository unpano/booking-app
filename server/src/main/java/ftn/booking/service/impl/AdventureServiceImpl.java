package ftn.booking.service.impl;

import ftn.booking.dto.AdventureActionClientsDTO;
import ftn.booking.dto.AdventureAdditionalServiceDTO;
import ftn.booking.dto.AdventureDTO;
import ftn.booking.dto.AdventureActionDTO;
import ftn.booking.model.*;
import ftn.booking.repository.*;
import ftn.booking.service.AdventureService;
import lombok.AllArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.swing.*;
import java.io.File;
import java.io.IOException;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class AdventureServiceImpl implements AdventureService {

    private AdventureRepository adventureRepository;

    private AdventureActionRepository adventureActionRepository;

    private AdventureActionClientsRepository adventureActionClientsRepo;

    private AdventureAdditionalServiceRepository advAddServRepository;

    private AdventureImagesRepository adventureImagesRepository;

    private ModelMapper modelMapper;

    @Override
    public Adventure addAdventure(Adventure adventure) {

        adventure.setNumberOfActions(0L);
        adventure.setNumberOfPastActions(0L);
        return adventureRepository.save(adventure);

    }

    @Override
    public Boolean deleteAdventure(Long adventureId){


        Adventure adventure = adventureRepository.findById(adventureId).get();
        List<AdventureImage> adventureImages = adventureImagesRepository.findAll();
        for(AdventureImage image: adventureImages){
            if(image.getAdventure().getId().equals(adventureId)){

                String pathName = image.getPath();

                //ovo je da bi se slika obrisala na angularu
                String filePath = System.getProperty("user.dir");
                filePath = filePath.replace("server", "client");
                File outputFile = new File("/home/dejan/Desktop/isa_projekat/booking-app/client/src/assets/adventure-pictures/" + pathName);
                boolean success = outputFile.delete();

                //treba ubeleziti da adventureID-ju odgovara ta slika

                adventureImagesRepository.delete(image);
            }
        }

        adventureRepository.delete(adventure);

        return Boolean.TRUE;
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
    public AdventureActionDTO addNewActionForAdventure(AdventureActionDTO adventureReservationDTO,
                                                       Long adventureId){

        Adventure adventure = adventureRepository.findById(adventureId).get();
        adventure.setNumberOfActions(adventure.getNumberOfActions()+1L);
        adventureRepository.save(adventure);

        AdventureAction adventureReservation = modelMapper.map(adventureReservationDTO, AdventureAction.class);
        adventureReservation.setAdventure(adventure);
        adventureReservation.setIsReserved(Boolean.FALSE);

        adventureReservation.setStartTime(adventureReservationDTO.getStartTime().plusHours(2));
        adventureReservation.setEndTime(adventureReservationDTO.getEndTime().plusHours(25).plusMinutes(59).plusSeconds(59));



        adventureActionRepository.save(adventureReservation);


        return modelMapper.map(adventureReservation, AdventureActionDTO.class);
    }

    @Override
    public List<AdventureAdditionalServiceDTO> addAdditionalServicesForAdventureAction(
            List<String> additionalServicesAdvAction,
            Long adventureReservationId){



        List<AdventureAdditionalServiceDTO> additionalServiceDTOList = new ArrayList<>();

        for(String adventureAddServ: additionalServicesAdvAction){

            AdventureAction addReservation = new AdventureAction();
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
    public List<AdventureActionDTO> getAllActionsForAdventure(Long adventureId){
        List<AdventureAction> allActions = adventureActionRepository.findAll();
        List<AdventureActionDTO> allActionsDTO = new ArrayList<>();

        for(AdventureAction adventureReservation: allActions){
            if(adventureReservation.getAdventure().getId().equals(adventureId)){
                int comparation = adventureReservation.getEndTime().compareTo(LocalDateTime.now());
                if(comparation >= 0) {
                    allActionsDTO.add(modelMapper.map(adventureReservation, AdventureActionDTO.class));
                }
            }
        }

        return allActionsDTO;

    }

    @Override
    public List<AdventureActionDTO> getAllActionsForClient(Long clientId){
        List<AdventureAction> allActions = adventureActionRepository.findAll();
        List<AdventureActionDTO> allActionsDTO = new ArrayList<>();

        List<AdventureActionClients> allBookedActions = adventureActionClientsRepo.findAll();
        List<AdventureActionClients> allBookedActionsClient = new ArrayList<>();

        for(AdventureActionClients bookedAction:allBookedActions){
            if(bookedAction.getClient().getId().equals(clientId)){
                allBookedActionsClient.add(bookedAction);
            }
        }


        AdventureActionDTO oneAction = new AdventureActionDTO();

        for(AdventureAction adventureAction: allActions){
                int comparation = adventureAction.getEndTime().compareTo(LocalDateTime.now());
                if(comparation >= 0) {

                    Boolean isEqual = Boolean.FALSE;
                    for(AdventureActionClients bookedAction:allBookedActionsClient) {
                        //hocemo da za tog klijenta dobavimo one akcije koje nije rezervisao
                        if(bookedAction.getAction().getId().equals(adventureAction.getId())){
                            isEqual = Boolean.TRUE;
                        }

                        }

                    if(!isEqual){
                        oneAction = modelMapper.map(adventureAction, AdventureActionDTO.class);
                        oneAction.setInstructorId(adventureAction.getAdventure().getInstructor().getId());
                        oneAction.setInstructorEmail(adventureAction.getAdventure().getInstructor().getEmail());
                        allActionsDTO.add(oneAction);
                    }

                   }
                }


                return allActionsDTO;

    }

    @Override
    public List<AdventureActionDTO> getAllBookedActionsForClient(Long clientId){
        List<AdventureAction> allActions = adventureActionRepository.findAll();
        List<AdventureActionDTO> allActionsDTO = new ArrayList<>();

        List<AdventureActionClients> allBookedActions = adventureActionClientsRepo.findAll();
        List<AdventureActionClients> allBookedActionsClient = new ArrayList<>();

        //ovde pronalazim koje je sve akcije taj klijent rezervisao
        for(AdventureActionClients bookedAction:allBookedActions){
            if(bookedAction.getClient().getId().equals(clientId)){
                allBookedActionsClient.add(bookedAction);
            }
        }


        AdventureActionDTO oneAction = new AdventureActionDTO();

        for(AdventureAction adventureAction: allActions){
                for(AdventureActionClients bookedAction:allBookedActionsClient) {
                    //hocemo da za tog klijenta dobavimo one akcije koje nije rezervisao
                    if(bookedAction.getAction().getId().equals(adventureAction.getId())){
                        oneAction = modelMapper.map(adventureAction, AdventureActionDTO.class);
                        oneAction.setInstructorId(adventureAction.getAdventure().getInstructor().getId());
                        oneAction.setInstructorEmail(adventureAction.getAdventure().getInstructor().getEmail());
                        allActionsDTO.add(oneAction);
                    }
                }

        }

        return allActionsDTO;
    }

    @Override
    public List<AdventureActionDTO> getAllPastActionsForAdventure(Long adventureId){
        List<AdventureAction> allPastActions = adventureActionRepository.findAll();
        List<AdventureActionDTO> allPastActionsDTO = new ArrayList<>();

        for(AdventureAction adventureReservation: allPastActions){
            if(adventureReservation.getAdventure().getId().equals(adventureId)){
                int comparation = adventureReservation.getEndTime().compareTo(LocalDateTime.now());
                if(comparation < 0) {
                    allPastActionsDTO.add(modelMapper.map(adventureReservation, AdventureActionDTO.class));
                }
            }
        }

        return allPastActionsDTO;
    }

    @Override
    public Long changeNumOfActiveActions(Long adventureId){
        List<AdventureAction> allActions = adventureActionRepository.findAll();
        Long  numOfActiveActions = 0L;

        for(AdventureAction adventureReservation: allActions){
            if(adventureReservation.getAdventure().getId().equals(adventureId)){
                numOfActiveActions += 1L;
                int comparation = adventureReservation.getEndTime().compareTo(LocalDateTime.now());
                if(comparation < 0) {
                   numOfActiveActions -= 1L;
                }
            }
        }
        Adventure adventure = adventureRepository.findById(adventureId).get();
        adventure.setNumberOfActions(numOfActiveActions);
        adventureRepository.save(adventure);

        return numOfActiveActions;

    }

    @Override
    public Long changeNumOfPastActions(Long adventureId){
        List<AdventureAction> allActions = adventureActionRepository.findAll();
        Long  numOfPastActions = 0L;

        for(AdventureAction adventureReservation: allActions){
            if(adventureReservation.getAdventure().getId().equals(adventureId)){
                int comparation = adventureReservation.getEndTime().compareTo(LocalDateTime.now());
                if(comparation < 0) {
                    numOfPastActions += 1L;
                }
            }
        }
        Adventure adventure = adventureRepository.findById(adventureId).get();
        adventure.setNumberOfPastActions(numOfPastActions);
        adventureRepository.save(adventure);

        return numOfPastActions;
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
    public AdventureActionDTO getOneActionForAdventure(Long adventureReservationId){
        AdventureAction adventureReservation = adventureActionRepository.findById(adventureReservationId).get();

        return modelMapper.map(adventureReservation, AdventureActionDTO.class);
    }

    @Override
    public String deleteActionForAdventure(Long adventureReservationId){
           String success = deleteAddServices(adventureReservationId);


           AdventureAction adventureAction = adventureActionRepository.findById(adventureReservationId).get();
           Adventure adventure = adventureAction.getAdventure();
           adventure.setNumberOfActions(adventure.getNumberOfActions()-1L);

           adventureActionRepository.delete(adventureAction);

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

    @Override
    public AdventureActionDTO changeOneActionForAdventure(AdventureActionDTO changedAction,
                                                          Long adventureReservationId){
        deleteAddServices(adventureReservationId);
        addAdditionalServicesForAdventureAction(changedAction.getAdditionalAdvServices(),adventureReservationId);

        //---------------------------------------------
        AdventureAction forSavingAction = adventureActionRepository.findById(adventureReservationId).get();


        forSavingAction.setStartTime(changedAction.getStartTime());

        forSavingAction.setEndTime(changedAction.getEndTime().plusHours(25L).plusMinutes(59L).plusSeconds(59L));



        forSavingAction.setExactPlace(changedAction.getExactPlace());

        adventureActionRepository.save(forSavingAction);

        return modelMapper.map(forSavingAction, AdventureActionDTO.class);
    }


    @Override
    public List<LocalDateTime> getForbidenDatesSpecificAction(Long actionId){
        List<AdventureAction> adventureActions = adventureActionRepository.findAll();

        Long numberOfDays = 0L;
        AdventureAction targetAction = adventureActionRepository.findById(actionId).get();
        List<LocalDateTime> forbiddenDates = new ArrayList<>();

        for(AdventureAction action:adventureActions){
            // hocemo datume koji ne pripadaju datoj akciji
            if(!action.getId().equals(targetAction.getId())){
                numberOfDays = Duration.between(action.getStartTime(),action.getEndTime()).toDays();

                for(Long i=0L;i<numberOfDays+1L;i++) {
                    forbiddenDates.add(action.getStartTime().plusDays(i));
                }

            }
        }

        return forbiddenDates;
    }

    @Override
    public List<LocalDateTime> getForbidenDates(){
        List<AdventureAction> adventureActions = adventureActionRepository.findAll();

        Long numberOfDays = 0L;
        List<LocalDateTime> forbiddenDates = new ArrayList<>();

        for(AdventureAction action:adventureActions){
            // hocemo sve datume koji su zauzeti

                numberOfDays = Duration.between(action.getStartTime(),action.getEndTime()).toDays();

                for(Long i=0L;i<numberOfDays+1L;i++) {
                    forbiddenDates.add(action.getStartTime().plusDays(i));
                }

            }


        return forbiddenDates;
    }

    @Override
    public AdventureActionClientsDTO addNewBookingForAction(Long adventureActionId,
                                                     Long clientId){

        AdventureActionClients newBooking = new AdventureActionClients();
        AdventureAction action = new AdventureAction();
        action.setId(adventureActionId);
        action.setIsReserved(Boolean.TRUE);

        Client client = new Client();
        client.setId(clientId);

        newBooking.setAction(action);
        newBooking.setClient(client);

        adventureActionClientsRepo.save(newBooking);

        return modelMapper.map(newBooking,AdventureActionClientsDTO.class);

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
