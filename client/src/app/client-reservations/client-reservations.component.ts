import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionClientReserved } from '../dto/ActionClientReserved';
import { AdventureReservation } from '../dto/AdventureReservation';
import { User } from '../dto/user';
import { ClientReservationsService } from './service/client-reservations.service';

@Component({
  selector: 'app-client-reservations',
  templateUrl: './client-reservations.component.html',
  styleUrls: ['./client-reservations.component.css']
})
export class ClientReservationsComponent implements OnInit {

  allActions : AdventureReservation[] = new Array();

  allBookedActions : AdventureReservation[] = new Array();

  client : User = new User();
  clientId !: Number;

  constructor(private router: Router,
              private activeRoute: ActivatedRoute,
              private clientReservationService: ClientReservationsService) { }

  ngOnInit(): void {
    const headers = { 'content-type': 'application/json',
                      'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };

    this.clientReservationService.getClient().subscribe(data=>{
      this.client = data;
      this.clientId = this.client.id;
    

      console.log(this.clientId);

    this.clientReservationService.getAllBookedActionsForClient(this.clientId,options).subscribe(data=>{
      this.allBookedActions = Object.assign(data);
      console.log(this.allBookedActions);

      this.allBookedActions.forEach(element=>{
        this.clientReservationService.getAllAddServices(element.id,options).subscribe(data=>{
           element.additionalAdvServices = new Array();
           var addBookedServices = Object.assign(data);

           addBookedServices.forEach((oneAddService: { name: String; }) => {
                element.additionalAdvServices.push(oneAddService.name);
           });
        })

        });
      
  })



    this.clientReservationService.getAllActionsForClient(this.clientId,options).subscribe(data=>{
      this.allActions = Object.assign(data);
      console.log(this.allActions);

      this.allActions.forEach(element=>{
        this.clientReservationService.getAllAddServices(element.id,options).subscribe(data=>{
           element.additionalAdvServices = new Array();
           var addServices = Object.assign(data);

           addServices.forEach((oneAddService: { name: String; }) => {
                element.additionalAdvServices.push(oneAddService.name);
           });
        })

        });
    })





  });
 
  }

  reserveAction(actionId:Number){
    const headers = { 'content-type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };
    var actionForReservation = new ActionClientReserved();
    actionForReservation.actionId = actionId;
    actionForReservation.clientId = this.clientId;
    if(window.confirm("You want to reserve this action?")){
        this.clientReservationService.reserveOneAction(actionForReservation,options).subscribe();
        window.setInterval('document.location.reload()', 1000);
    } else {
      window.close();
    }

  }

  cancelBooking(clientId:Number,actionId:Number){
    const headers = { 'content-type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };

    if(window.confirm("You want to reserve this action?")){
      this.clientReservationService.cancelBookingAction(actionId,clientId,options).subscribe();
      window.setInterval('document.location.reload()', 1000);
  } else {
    window.close();
  }

  }

  viewActionDetails(actionId:Number){
    this.router.navigate(['view-action-details/',actionId]);
    
  }


}
