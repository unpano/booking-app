import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../dto/user';
import { CalendarBookingClientsService } from './service/calendar-booking-clients.service';

@Component({
  selector: 'app-calendar-booking-clients',
  templateUrl: './calendar-booking-clients.component.html',
  styleUrls: ['./calendar-booking-clients.component.css']
})
export class CalendarBookingClientsComponent implements OnInit {

  actionId !: Number;
  allClients : User[] = new Array();
  searchText !: any;
  constructor(private router:Router,
              private activeRoute: ActivatedRoute,
              private calendarBookingClientService:CalendarBookingClientsService) { }

  ngOnInit(): void {
    const headers = { 'content-type': 'application/json',
                      'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
      let options = { headers: headers };

      this.actionId = this.activeRoute.snapshot.params['actionId'];
      console.log(this.actionId);

      this.calendarBookingClientService.getAllClientsForAction(this.actionId,options).subscribe(data=>{
        this.allClients = Object.assign(data);
        console.log(this.allClients);
      })



  }

  back(){
    this.router.navigate(['calendar-booking-instructor']);
  }

}
