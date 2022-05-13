import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdventureReservation } from '../dto/AdventureReservation';
import { EditActionAdventureService } from './service/edit-action-adventure.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { AdditionalAdvService } from '../dto/AdditionalAdvService';
import {  DateFilterFn } from '@angular/material/datepicker';


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
  

  forbiddenDates : Date[] = new Array();

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

        const headers = { 'content-type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
        let options = { headers: headers };

        this.editActionService.getForbiddenDates(this.adventureActionId,options).subscribe(data=>{
          this.forbiddenDates = Object.assign(data);
          console.log(this.forbiddenDates);
        })


       
        this.editActionService.getOneAdventureAction(this.adventureActionId,options).subscribe(data=>{
            this.adventureAction = Object.assign(data);
            console.log(this.adventureAction);
            

            this.pickPeriod.value.start = this.adventureAction.startTime;
            this.pickPeriod.value.end = this.adventureAction.endTime;
        });


       console.log(sessionStorage.getItem("token"));
       let options2 = options;
        this.editActionService.getAdventureAdditionalServices(this.adventureActionId,options).subscribe(data=>{
            this.addServicesOnInit = Object.assign(data);
            this.addServicesOnInit.forEach(element => {
              this.addServices.push({name: element.name});
            });

           // console.log(this.addServices);
        });

        
  }

  rangeFilter: DateFilterFn<Date> = (date: Date | null) => {
      if (date != null ) return this.isFree(date);
      return true
    }; 
 
  isFree(input: Date): boolean{
    let dateIsFree : boolean = true

    //input.setDate(input.getDate() +1)

    let date1 = new Date(input).toISOString()
    date1.toLocaleString();
    date1 = date1.substring(0,date1.indexOf("T"))


    this.forbiddenDates.forEach((date: Date)=> {
      
       let convertedDate = new Date(date).toISOString();
        convertedDate.toLocaleString();
        convertedDate = convertedDate.substring(0,convertedDate.indexOf("T"));

      if(date1 == convertedDate){
      
        dateIsFree = false
      }
    });
     return dateIsFree
    
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

    const headers = { 'content-type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };
      
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

      this.editActionService.changeOneAction(this.adventureAction,this.adventureActionId,options).subscribe(data=>{
        this.router.navigate(['profile-adventure-fishing-class/',this.adventureAction.adventure.id]);
        
      })
  }

}
