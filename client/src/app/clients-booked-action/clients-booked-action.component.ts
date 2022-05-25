import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../dto/user';
import { ClientsBookedActionService } from './service/clients-booked-action.service';

@Component({
  selector: 'app-clients-booked-action',
  templateUrl: './clients-booked-action.component.html',
  styleUrls: ['./clients-booked-action.component.css']
})
export class ClientsBookedActionComponent implements OnInit {

  actionId !: Number;

  hasReport !: Boolean;

  isActionPast !: Boolean;
  
  clients : User[] = new Array();
  constructor(private router:Router,
              private activeRoute: ActivatedRoute,
              private clientsBookedActionService: ClientsBookedActionService) { }

  ngOnInit(): void {
    this.actionId = this.activeRoute.snapshot.params['id'];
    console.log(this.actionId);

    const headers = { 'content-type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
      let options = { headers: headers };

    this.clientsBookedActionService.getIfActionIsPast(this.actionId,options).subscribe(data=>{
      this.isActionPast = Object.assign(data);
    });

    this.clientsBookedActionService.getAllClientsBookedAction(this.actionId,options).subscribe(data=>{
        this.clients = Object.assign(data);
        console.log(this.clients);

        this.clients.forEach(client => {
          this.clientsBookedActionService.getIfActionHasReport(client.id,this.actionId,options).subscribe(data=>{
           client.hasReport = Object.assign(data);
            console.log(this.hasReport);
        })
          
        });
    });

    

  }

  backToAdventure(actionId:Number){
    const headers = { 'content-type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
      let options = { headers: headers };
    this.clientsBookedActionService.getAdventureIdForAction(actionId,options).subscribe(data=>{
      let adventureId = data;
      console.log(adventureId);
      this.router.navigate(['profile-adventure-fishing-class/',adventureId]);

    })
  }

  createReport(actionId:Number,clientId:Number){
      this.router.navigate(['report-about-clients/actionId/' + actionId + '/clientId/' + clientId]);
  }

  viewReport(actionId:Number,clientId:Number){
      this.router.navigate(['view-report-action/actionId/' + actionId + '/clientId/' + clientId]);
  }

  bookNewAction(clientId:Number,actionId:Number){
      this.router.navigate(['client-new-booking-by-instructor/clientId/'+ clientId + '/currentActionId/'+actionId]);
  }

}
