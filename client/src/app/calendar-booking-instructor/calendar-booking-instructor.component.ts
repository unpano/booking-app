import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionClientReserved } from '../dto/ActionClientReserved';
import { AdventureReservation } from '../dto/AdventureReservation';
import { CalendarBookingInstructorService } from './service/calendar-booking-instructor.service';

@Component({
  selector: 'app-calendar-booking-instructor',
  templateUrl: './calendar-booking-instructor.component.html',
  styleUrls: ['./calendar-booking-instructor.component.css']
})
export class CalendarBookingInstructorComponent implements OnInit {

  adventureActions : AdventureReservation[] = new Array();
  searchText !: any;
  constructor(private calendarBookingInstructorService: CalendarBookingInstructorService,
              private router:Router) { }

  ngOnInit(): void {
    const headers = { 'content-type': 'application/json',
                      'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
      let options = { headers: headers };

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
