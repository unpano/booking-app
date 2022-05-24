import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdditionalAdvService } from '../dto/AdditionalAdvService';
import { AdventureReservation } from '../dto/AdventureReservation';
import { AddService } from '../edit-action-adventure/edit-action-adventure.component';
import { ViewActionDetailsService } from './service/view-action-details.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';


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

  constructor(private router:Router,
              private activeRoute:ActivatedRoute,
              private viewActionDetailsService:ViewActionDetailsService) { }

  ngOnInit(): void {
    this.adventureActionId = this.activeRoute.snapshot.params['id'];
        console.log(this.adventureActionId);

        const headers = { 'content-type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
        let options = { headers: headers };

        this.viewActionDetailsService.getOneAdventureAction(this.adventureActionId,options).subscribe(data=>{
          this.adventureAction = Object.assign(data);
          console.log(this.adventureAction);
          

          
      });

      let options2 = options;
        this.viewActionDetailsService.getAdventureAdditionalServices(this.adventureActionId,options).subscribe(data=>{
            this.addServicesOnInit = Object.assign(data);
            this.addServicesOnInit.forEach(element => {
              this.addServices.push({name: element.name});
            });

           // console.log(this.addServices);
        });



  }

  client_reservations(){
    this.router.navigate(['clientReservations']);
  }

}
