import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionClientReserved } from '../dto/ActionClientReserved';
import { AdventureReservation } from '../dto/AdventureReservation';
import { User } from '../dto/user';
import { ClientNewBookingService } from './service/client-new-booking.service';

@Component({
  selector: 'app-client-new-booking-by-instructor',
  templateUrl: './client-new-booking-by-instructor.component.html',
  styleUrls: ['./client-new-booking-by-instructor.component.css']
})
export class ClientNewBookingByInstructorComponent implements OnInit {

  searchText !: any;
  clientId !: Number;
  currentActionId !: Number
  currentAdventureId !: Number

  allActions : AdventureReservation[] = new Array();

  clientInfo : User = new User();
  
  constructor(private activeRoute:ActivatedRoute,
              private router:Router,
              private clientNewBookingService:ClientNewBookingService) { }

  ngOnInit(): void {
    const headers = { 'content-type': 'application/json',
                      'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };

   this.clientId =  this.activeRoute.snapshot.params['clientId'];
   console.log(this.clientId);
   this.currentActionId = this.activeRoute.snapshot.params['currentActionId'];
   console.log(this.currentActionId);

   this.clientNewBookingService.getClientInfo(this.clientId,options).subscribe(client=>{
     this.clientInfo = Object.assign(client);
     console.log(this.clientInfo);
   })

    this.clientNewBookingService.getAdventureIByActionId(this.currentActionId,options).subscribe(data=>{
      this.currentAdventureId = Object.assign(data);
      console.log(this.currentAdventureId);
    })

    this.clientNewBookingService.getAllActionsForClient(this.clientId,options).subscribe(data=>{
      this.allActions = Object.assign(data);
      console.log(this.allActions);

      this.allActions.forEach(element=>{
        this.clientNewBookingService.getAllAddServices(element.id,options).subscribe(data=>{
           element.additionalAdvServices = new Array();
           var addServices = Object.assign(data);

           addServices.forEach((oneAddService: { name: String; }) => {
                element.additionalAdvServices.push(oneAddService.name);
           });
        })

        });
      })



  }

  goBack(currentActionId:Number){
    this.router.navigate(['clients-booked-action/'+currentActionId]);
  }

  reserve(currentAdventureId:Number,activeActionId:Number,clientId:Number){
    const headers = { 'content-type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };
    var actionForReservation = new ActionClientReserved();
    actionForReservation.actionId = activeActionId;
    actionForReservation.clientId = clientId;
    if(window.confirm("You want to reserve this action for client?")){
        this.clientNewBookingService.reserveOneAction(actionForReservation,options).subscribe();
        console.log(this.clientInfo.email);
        this.clientNewBookingService.sendMailNewReservationByInstructor(this.clientInfo.email,options).subscribe();
        alert("You reserved new action for "+ this.clientInfo.firstName+ " "+ this.clientInfo.lastName+"\nHe will receive verification email on "+this.clientInfo.email);
        this.router.navigate(['profile-adventure-fishing-class/'+currentAdventureId]);
    } else {
      window.close();
    }


    
  }

}
