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

  client : User = new User();

  constructor(private router: Router,
              private activeRoute: ActivatedRoute,
              private clientReservationService: ClientReservationsService) { }

  ngOnInit(): void {
    const headers = { 'content-type': 'application/json',
                      'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };

    this.clientReservationService.getClient().subscribe(data=>{
      this.client = data;
      console.log(this.client);
    })

    this.clientReservationService.getAllActionsForClient(options).subscribe(data=>{
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
 
  }

  reserveAction(actionId:Number){
    const headers = { 'content-type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };
    var actionForReservation = new ActionClientReserved();
    actionForReservation.actionId = actionId;
    actionForReservation.clientId = this.client.id;
    this.clientReservationService.reserveOneAction(actionForReservation,options).subscribe();
  }




}
