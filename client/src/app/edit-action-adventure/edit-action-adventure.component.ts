import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdventureReservation } from '../dto/AdventureReservation';
import { EditActionAdventureService } from './service/edit-action-adventure.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { AdditionalAdvService } from '../dto/AdditionalAdvService';


export interface AddService {
  name: String;
}

@Component({
  selector: 'app-edit-action-adventure',
  templateUrl: './edit-action-adventure.component.html',
  styleUrls: ['./edit-action-adventure.component.css']
})
export class EditActionAdventureComponent implements OnInit {

  adventureActionId !: Number;

  pickPeriod : FormGroup = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });;

  minDate = new Date;

  additionalServiceList : String[] = new Array();
  

  addOnBlur = true;

  adventureAction : AdventureReservation = new AdventureReservation();

  isActionReserved !: Boolean;


  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  addServicesOnInit : AdditionalAdvService[] = [];
  addServices: AddService[] = [];
  


  constructor(private router:Router,
    private activeRoute:ActivatedRoute,
    private editActionService: EditActionAdventureService) {
      const today = new Date();
      const month = today.getMonth();
      const year = today.getFullYear();
  
       


     }

  ngOnInit(): void {
        this.adventureActionId = this.activeRoute.snapshot.params['id'];
        console.log(this.adventureActionId);
        
        this.editActionService.getOneAdventureAction(this.adventureActionId).subscribe(data=>{
            this.adventureAction = data;
            console.log(this.adventureAction);
            

            this.pickPeriod.value.start = this.adventureAction.startTime;
            this.pickPeriod.value.end = this.adventureAction.endTime;
        });


        this.editActionService.getAdventureAdditionalServices(this.adventureActionId).subscribe(data=>{
            this.addServicesOnInit = data;
            this.addServicesOnInit.forEach(element => {
              this.addServices.push({name: element.name});
            });

           // console.log(this.addServices);
        });

        
  }

  //for adding chips
add(event: MatChipInputEvent): void {
  const value = (event.value || '').trim();

  // Add our addition service
  if (value) {
    this.addServices.push({name: value});
  }

  // Clear the input value
  event.chipInput!.clear();
}

remove(addService: AddService): void {
  const index = this.addServices.indexOf(addService);

  if (index >= 0) {
    this.addServices.splice(index, 1);
  }
}
  cancel(){
    this.router.navigate(['profile-adventure-fishing-class/',this.adventureAction.adventure.id]);
  }

  save_edited_action(){
      
      //console.log(this.adventureAction);
      console.log(this.adventureAction.startTime);
      console.log(this.adventureAction.endTime);
      console.log(this.addServices);
      this.adventureAction.additionalAdvServices = new Array();
      this.addServices.forEach(element => {
          this.adventureAction.additionalAdvServices.push(element.name);
      });
     console.log(this.adventureAction.additionalAdvServices);
      
      console.log(this.adventureAction.exactPlace);

      this.editActionService.changeOneAction(this.adventureAction,this.adventureActionId).subscribe(data=>{
        this.router.navigate(['profile-adventure-fishing-class/',this.adventureAction.adventure.id]);
        
      })
  }

}
