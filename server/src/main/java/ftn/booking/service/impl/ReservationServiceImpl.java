package ftn.booking.service.impl;

import ftn.booking.exception.NotFoundException;
import ftn.booking.model.Reservation;
import ftn.booking.model.enums.ReservationType;
import ftn.booking.repository.ReservationRepository;
import ftn.booking.service.ReservationService;
import ftn.booking.utils.ChartMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class ReservationServiceImpl implements ReservationService {

    private ReservationRepository reservationRepository;

    @Override
    public Reservation add(Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    @Override
    public List<Reservation> findAllinPeriod(LocalDateTime startDate, LocalDateTime endDate) {
        return reservationRepository.findAllByReservationTypeAndStartTimeAndEndTime("BOAT", startDate, endDate);
    }
/*
    @Override
    public List<Reservation> findOneByEntityIdAndClientIdAndReservationType(Long entityId, Long id, ReservationType reservationType, LocalDateTime startTime, LocalDateTime endTime) {
        return reservationRepository.findAllByEntityIdAndClientIdAndReservationType(entityId, id, reservationType.toString(), startTime, endTime);
    }*/

    @Override
    public List<Reservation> findOneByEntityIdAndReservationType(Long entityId, ReservationType reservationType, LocalDateTime startTime, LocalDateTime endTime) {
        return reservationRepository.findAllByEntityIdAndReservationType(entityId, reservationType.toString(),startTime,endTime);
    }

    @Override
    public List<Reservation> findAllFutureActionsByCottageId(Long id) {
      return reservationRepository.findAllByCottageIdAndClientIdAndStartTimeAfter(id,null, LocalDateTime.now());
    }

    @Override
    public Reservation findById(Long id) {
        return reservationRepository.findById(id).orElseThrow(() -> new NotFoundException(id,"Reservation with id " + id + " does not exist."));

    }

    @Override
    public Reservation update(Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    @Override
    public List<Reservation> findAllPastReservationsByCottageId(Long id) {
        return reservationRepository.findAllByCottageIdAndEndTimeBefore(id, LocalDateTime.now());
    }

    @Override
    public List<Reservation> findAllPastReservationsByBoatId(Long id) {
        return reservationRepository.findAllByBoatIdAndEndTimeBefore(id, LocalDateTime.now());
    }

    @Override
    public Long findIncome(Long id, LocalDateTime startTime, LocalDateTime endTime) {
        return reservationRepository.findBoatIncome(id, startTime, endTime);
    }

    @Override
    public List<ChartMapper> findMonthlyBoatData(Long id) {
        List<Reservation> reservations = reservationRepository.findAllByBoatId(id);

        List<LocalDate> dates = new ArrayList<>();

        for (Reservation res :
                reservations) {
            List<LocalDate> arrayOfDates = findAllDatesBetweenTwoDates(res.getStartTime(),res.getEndTime());
            //add if not exist
            for(LocalDate date: arrayOfDates){
                if(!dates.contains(date)){
                    dates.add(date);
                }
            }
        }

        return findMonthlyData(dates);
    }

    private List<ChartMapper> findWeeklyData(List<LocalDate> dates){
        List<ChartMapper> retList = new ArrayList<>();

        //kreiraj chartMapper instancu
        ChartMapper day1 = new ChartMapper();
        day1.setName("Monday");

        ChartMapper day2 = new ChartMapper();
        day2.setName("Tuesday");

        ChartMapper day3 = new ChartMapper();
        day3.setName("Wednesday");

        ChartMapper day4 = new ChartMapper();
        day4.setName("Thursday");

        ChartMapper day5 = new ChartMapper();
        day5.setName("Friday");

        ChartMapper day6 = new ChartMapper();
        day6.setName("Saturday");

        ChartMapper day7 = new ChartMapper();
        day7.setName("Sunday");

        int mondayCounter = 0;
        int tuesdayCounter = 0;
        int wednesdayCounter = 0;
        int thursdayCounter = 0;
        int fridayCounter = 0;
        int saturdayCounter = 0;
        int sundayCounter = 0;

        for (LocalDate date:
                dates
        ) {
            //koji je mesec
            int dayOfWeek = date.getDayOfWeek().getValue();
            if(dayOfWeek == 1) mondayCounter++;
            if(dayOfWeek == 2) tuesdayCounter++;
            if(dayOfWeek == 3) wednesdayCounter++;
            if(dayOfWeek == 4) thursdayCounter++;
            if(dayOfWeek == 5) fridayCounter++;
            if(dayOfWeek == 6) saturdayCounter++;
            if(dayOfWeek == 7) sundayCounter++;
        }
        day1.setValue(mondayCounter);
        retList.add(day1);
        day2.setValue(tuesdayCounter);
        retList.add(day2);
        day3.setValue(wednesdayCounter);
        retList.add(day3);
        day4.setValue(thursdayCounter);
        retList.add(day4);
        day5.setValue(fridayCounter);
        retList.add(day5);
        day6.setValue(saturdayCounter);
        retList.add(day6);
        day7.setValue(sundayCounter);
        retList.add(day7);

        return retList;
    }

    private List<ChartMapper> findMonthlyData(List<LocalDate> dates){

        List<ChartMapper> retList = new ArrayList<>();

        //kreiraj chartMapper instancu
        ChartMapper month1 = new ChartMapper();
        month1.setName("January");

        ChartMapper month2 = new ChartMapper();
        month2.setName("February");

        ChartMapper month3 = new ChartMapper();
        month3.setName("March");

        ChartMapper month4 = new ChartMapper();
        month4.setName("April");

        ChartMapper month5 = new ChartMapper();
        month5.setName("May");

        ChartMapper month6 = new ChartMapper();
        month6.setName("June");

        ChartMapper month7 = new ChartMapper();
        month7.setName("July");

        ChartMapper month8 = new ChartMapper();
        month8.setName("August");

        ChartMapper month9 = new ChartMapper();
        month9.setName("September");

        ChartMapper month10 = new ChartMapper();
        month10.setName("October");

        ChartMapper month11 = new ChartMapper();
        month11.setName("November");

        ChartMapper month12 = new ChartMapper();
        month12.setName("December");

        int januaryCounter = 0;
        int februaryCounter = 0;
        int marchCounter = 0;
        int aprilCounter = 0;
        int mayCounter = 0;
        int juneCounter = 0;
        int julyCounter = 0;
        int augustCounter = 0;
        int septemberCounter = 0;
        int octoberCounter = 0;
        int novemberCounter = 0;
        int decemberCounter = 0;

        for (LocalDate date:
                dates
        ) {
            //koji je mesec
            int month = date.getMonth().getValue();
            if(month == 1) januaryCounter++;
            if(month == 2) februaryCounter++;
            if(month == 3) marchCounter++;
            if(month == 4) aprilCounter++;
            if(month == 5) mayCounter++;
            if(month == 6) juneCounter++;
            if(month == 7) julyCounter++;
            if(month == 8) augustCounter++;
            if(month == 9) septemberCounter++;
            if(month == 10) octoberCounter++;
            if(month == 11) novemberCounter++;
            if(month == 12) decemberCounter++;
        }
        month1.setValue(januaryCounter);
        retList.add(month1);
        month2.setValue(februaryCounter);
        retList.add(month2);
        month3.setValue(marchCounter);
        retList.add(month3);
        month4.setValue(aprilCounter);
        retList.add(month4);
        month5.setValue(mayCounter);
        retList.add(month5);
        month6.setValue(juneCounter);
        retList.add(month6);
        month7.setValue(julyCounter);
        retList.add(month7);
        month8.setValue(augustCounter);
        retList.add(month8);
        month9.setValue(septemberCounter);
        retList.add(month9);
        month10.setValue(octoberCounter);
        retList.add(month10);
        month11.setValue(novemberCounter);
        retList.add(month11);
        month12.setValue(decemberCounter);
        retList.add(month12);

        return retList;
    }

    @Override
    public List<ChartMapper> findWeeklyBoatData(Long id) {

        List<LocalDate> dates = new ArrayList<>();
        List<Reservation> reservations = reservationRepository.findAllByBoatId(id);

        for (Reservation res :
                reservations) {
            List<LocalDate> arrayOfDates = findAllDatesBetweenTwoDates(res.getStartTime(),res.getEndTime());
            //add if not exist
            for(LocalDate date: arrayOfDates){
                if(!dates.contains(date)){
                    dates.add(date);
                }
            }
        }

        return findWeeklyData(dates);
    }

    @Override
    public List<ChartMapper> findMonthlyCottageData(Long id) {
        List<Reservation> reservations = reservationRepository.findAllByCottageId(id);

        List<LocalDate> dates = new ArrayList<>();

        for (Reservation res :
                reservations) {
            List<LocalDate> arrayOfDates = findAllDatesBetweenTwoDates(res.getStartTime(),res.getEndTime());
            //add if not exist
            for(LocalDate date: arrayOfDates){
                if(!dates.contains(date)){
                    dates.add(date);
                }
            }
        }

        return findMonthlyData(dates);
    }

    @Override
    public List<ChartMapper> findWeeklyCottageData(Long id) {
        List<LocalDate> dates = new ArrayList<>();
        List<Reservation> reservations = reservationRepository.findAllByCottageId(id);

        for (Reservation res :
                reservations) {
            List<LocalDate> arrayOfDates = findAllDatesBetweenTwoDates(res.getStartTime(),res.getEndTime());
            //add if not exist
            for(LocalDate date: arrayOfDates){
                if(!dates.contains(date)){
                    dates.add(date);
                }
            }
        }

        return findWeeklyData(dates);
    }

    @Override
    public Long findIncomeCottage(Long id, LocalDateTime startTime, LocalDateTime endTime) {
        return reservationRepository.findCottageIncome(id, startTime, endTime);
    }

    @Override
    public List<Reservation> findAllFutureReservationsByCottageId(Long id) {
        return reservationRepository.findAllByCottageIdAndStartTimeAfter(id,LocalDateTime.now());
    }

    @Override
    public List<Reservation> findAllFutureReservationsByBoatId(Long id) {
        return reservationRepository.findAllByBoatIdAndStartTimeAfter(id,LocalDateTime.now());
    }

    @Override
    public List<Reservation> findAllFutureActionsByBoatId(Long id) {
        return reservationRepository.findAllByBoatIdAndClientIdAndStartTimeAfter(id,null, LocalDateTime.now());
    }

    @Override
    public Boolean checkIfDateIsFree(LocalDateTime date) {
        return reservationRepository.checkIfDateIsFree(date) <= 0;
    }

    @Override
    public List<LocalDate> findAllForbiddenDatesCottage(Long id) {
        List<Reservation> reservations = reservationRepository.findAllByReservationTypeAndCottageId(ReservationType.COTTAGE,id);
        List<LocalDate> forbiddenDates = new ArrayList<>();

        for (Reservation res: reservations) {
            List<LocalDate> betweenDates = findAllDatesBetweenTwoDates(res.getStartTime(),res.getEndTime());
            forbiddenDates.addAll(betweenDates);
        }

        return forbiddenDates;
    }

    @Override
    public List<LocalDate> findAllForbiddenDatesBoat(Long id) {
        List<Reservation> reservations = reservationRepository.findAllByReservationTypeAndBoatId(ReservationType.BOAT,id);
        List<LocalDate> forbiddenDates = new ArrayList<>();

        for (Reservation res: reservations) {
            List<LocalDate> betweenDates = findAllDatesBetweenTwoDates(res.getStartTime(),res.getEndTime());
            forbiddenDates.addAll(betweenDates);
        }

        return forbiddenDates;
    }

    @Override
    public List<Reservation> findAllByBoatId(Long id) {
        return reservationRepository.findAllByBoatId(id);
    }

    private List<LocalDate> findAllDatesBetweenTwoDates(LocalDateTime start, LocalDateTime end){

        List<LocalDate> totalDates = new ArrayList<>();

        while (!start.isAfter(end)) {
            totalDates.add(LocalDate.from(LocalDateTime.from(start)));
            start = start.plusDays(1);
        }

        return totalDates;
    }

    @Override
    public List<Reservation> findAllByCottageId(Long id) {
        return reservationRepository.findAllByCottageId(id);
    }
}
