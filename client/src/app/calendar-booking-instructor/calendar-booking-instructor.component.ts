import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { throwIfEmpty } from 'rxjs/operators';
import { ActionClientReserved } from '../dto/ActionClientReserved';
import { AdventureReservation } from '../dto/AdventureReservation';
import { InstructorAvailablePeriod } from '../dto/InstructorAvailablePeriod';
import { User } from '../dto/user';
import { CalendarBookingInstructorService } from './service/calendar-booking-instructor.service';

@Component({
  selector: 'app-calendar-booking-instructor',
  templateUrl: './calendar-booking-instructor.component.html',
  styleUrls: ['./calendar-booking-instructor.component.css']
})
export class CalendarBookingInstructorComponent implements OnInit {

  adventureActions : AdventureReservation[] = new Array();
  searchText !: any;
  instructorInfo : User = new User();
  averageMarkInstructor !: Number;

  pickPeriod : FormGroup = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });;

  minDate = new Date;

  newPeriodAvailability : InstructorAvailablePeriod = new InstructorAvailablePeriod();

  constructor(private calendarBookingInstructorService: CalendarBookingInstructorService,
              private router:Router) { 
                const today = new Date();
                const month = today.getMonth();
                const year = today.getFullYear();

              }

  ngOnInit(): void {
    const headers = { 'content-type': 'application/json',
                      'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
      let options = { headers: headers };

    this.calendarBookingInstructorService.getInstructorInfo(options).subscribe(instructor=>{
      this.instructorInfo = Object.assign(instructor);
      console.log(this.instructorInfo);
      this.calendarBookingInstructorService.getAverageMarkInstructor(this.instructorInfo.id,options).subscribe(mark=>{
        this.averageMarkInstructor = Object.assign(mark);
        console.log(this.averageMarkInstructor);
      })


      this.calendarBookingInstructorService.getAvailabilityPeriod(this.instructorInfo.id,options).subscribe(data=>{
        this.newPeriodAvailability = Object.assign(data);
    });
    })

    this.calendarBookingInstructorService.getAllActiveActionsInstructor(options).subscribe(data=>{
      this.adventureActions = Object.assign(data);

      this.adventureActions.forEach(action => {
        this.calendarBookingInstructorService.getAdventureAdditionalServices(action.id,options).subscribe(addServices=>{
          action.additionalAdvServices = new Array(); 
                var addServicesVar = Object.assign(addServices);
                addServicesVar.forEach((oneAddService: { name: String; }) => {
                  action.additionalAdvServices.push(oneAddService.name);
                });
        })
      });
    })
  }


  clients(actionId:Number){
    this.router.navigate(['calendar-booking-clients/actionId/'+actionId]);
  }

}
