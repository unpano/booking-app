import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdditionalAdvService } from '../dto/AdditionalAdvService';
import { AdventureReservation } from '../dto/AdventureReservation';
import { AddService } from '../edit-action-adventure/edit-action-adventure.component';
import { ViewActionDetailsService } from './service/view-action-details.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { User } from '../dto/user';


@Component({
  selector: 'app-view-action-details',
  templateUrl: './view-action-details.component.html',
  styleUrls: ['./view-action-details.component.css']
})
export class ViewActionDetailsComponent implements OnInit {

  adventureActionId !: Number;
  adventureAction : AdventureReservation = new AdventureReservation();

  addServicesOnInit : AdditionalAdvService[] = [];
  addServices: AddService[] = [];



  pickPeriod : FormGroup = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });;

  minDate = new Date;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  addOnBlur = true;

  clientInfo : User = new User();
  isActionBooked !: Boolean;
  priceSilverClient !: Number;
  priceGoldClient !: Number;
  constructor(private router:Router,
              private activeRoute:ActivatedRoute,
              private viewActionDetailsService:ViewActionDetailsService) { }

  ngOnInit(): void {
    this.adventureActionId = this.activeRoute.snapshot.params['id'];
        console.log(this.adventureActionId);

        const headers = { 'content-type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
        let options = { headers: headers };

        this.viewActionDetailsService.getOneClientByEmail(options).subscribe(client=>{
          this.clientInfo = Object.assign(client);
          console.log(this.clientInfo);

          this.viewActionDetailsService.checkIfActionIsBookedByClient(this.adventureActionId,this.clientInfo.id,options).subscribe(isBooked=>{
            this.isActionBooked = Object.assign(isBooked);
            console.log(this.isActionBooked);


            this.viewActionDetailsService.getOneAdventureAction(this.adventureActionId,options).subscribe(data=>{
              this.adventureAction = Object.assign(data);
              console.log(this.adventureAction);
              if(this.isActionBooked==false && this.clientInfo.loyaltyCategory=='SILVER'){
                let oldPrice = this.adventureAction.adventure.price.valueOf();
                let multiplicator = 9/10;
                let newPrice = oldPrice * multiplicator;
                this.adventureAction.adventure.price = newPrice;
               
              } else if(this.isActionBooked==false && this.clientInfo.loyaltyCategory=='GOLD'){
                let oldPrice = this.adventureAction.adventure.price.valueOf();
                let multiplicator = 8/10;
                let newPrice = oldPrice * multiplicator;
                this.adventureAction.adventure.price = newPrice;
              }
              
    
              
          });
    
          let options2 = options;
            this.viewActionDetailsService.getAdventureAdditionalServices(this.adventureActionId,options).subscribe(data=>{
                this.addServicesOnInit = Object.assign(data);
                this.addServicesOnInit.forEach(element => {
                  this.addServices.push({name: element.name});
                });
    
               // console.log(this.addServices);
            });



          })

      })




       


      

  }

  client_reservations(){
    this.router.navigate(['clientReservations']);
  }

}
