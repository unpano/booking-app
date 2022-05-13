import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DateFilterFn } from '@angular/material/datepicker';
import { Global } from '../util/global';
import { HttpClient } from '@angular/common/http';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { AdventureReservation } from '../dto/AdventureReservation';
import { ReservationType } from '../dto/enums/ReservationType';
import { Adventure } from '../dto/Adventure';
import { NewActionAdventureService } from './service/new-action-adventure.service';

export interface AddService {
  name: string;
}


@Component({
  selector: 'app-new-action-adventure',
  templateUrl: './new-action-adventure.component.html',
  styleUrls: ['./new-action-adventure.component.css']
})
export class NewActionAdventureComponent implements OnInit {

  adventureReservation : AdventureReservation = new AdventureReservation();


  adventureId !: Number;


  advActionReturn : AdventureReservation = new AdventureReservation();
  
  pickPeriod !: FormGroup;

  minDate = new Date;

  additionalServiceList : String[] = new Array();
  

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  addServices: AddService[] = [{name: 'Massage'}, {name: 'Extra clothing'}];

  forbiddenDates : Date[] = new Array();

  constructor(private router: Router
    ,private activeRoute: ActivatedRoute,
    private http: HttpClient,
    private newActionAdventureService: NewActionAdventureService) { 
      const today = new Date();
      const month = today.getMonth();
      const year = today.getFullYear();
  
      this.pickPeriod = new FormGroup({
        start: new FormControl(),
        end: new FormControl(),
      }); 
    
      this.adventureReservation.reservationType = 2;
      this.adventureReservation.adventure = new Adventure();
    }

  ngOnInit(): void {
    this.adventureId = this.activeRoute.snapshot.params['id'];
    console.log(this.adventureId);
    const headers = { 'content-type': 'application/json',
     'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
     let options = { headers: headers };


    this.newActionAdventureService.getOneAdventure(this.adventureId,options).subscribe(data=>{
      this.adventureReservation.adventure = Object.assign(data);
    });

    this.newActionAdventureService.getForbidenDates(options).subscribe(data=>{
      this.forbiddenDates = Object.assign(data);
    })
    
  }


 rangeFilter: DateFilterFn<Date> = (date: Date | null) => {
  
    if (date != null)
     return this.isFree(date);
    return true
  }

  isFree(input: Date): boolean{
    let dateIsFree : boolean = true


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


  cancel(adventureId:Number){
    this.router.navigate(['profile-adventure-fishing-class/',adventureId]);
  }

  addAction(){
    
   //console.log(this.pickPeriod.value.start);
   this.adventureReservation.startTime = this.pickPeriod.value.start;
   console.log(this.adventureReservation.startTime);
   
   //console.log(this.pickPeriod.value.end);
   this.adventureReservation.endTime = this.pickPeriod.value.end;
   console.log(this.adventureReservation.endTime);

   this.additionalServiceList = [];
   this.addServices.forEach(element => {
     this.additionalServiceList.push(element.name);
   });
   console.log(this.additionalServiceList);

    //console.log(this.additionalServiceList);
    //console.log(this.adventureReservation.exactPlace);


   
   // console.log(this.adventureReservation.reservationType);
   // console.log(this.adventureReservation.adventure.id);
    console.log(this.adventureReservation);
    console.log(this.adventureId);

   // this.newActionAdventureService.addAdditonalServAdv(this.additionalServiceList,7).subscribe();

   this.adventureId = this.activeRoute.snapshot.params['id'];
   const headers = { 'content-type': 'application/json',
     'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
     let options = { headers: headers };

    this.newActionAdventureService.addAdventureAction(this.adventureReservation,this.adventureId,options).subscribe(data=>{
          this.advActionReturn = Object.assign(data);
          this.newActionAdventureService.addAdditonalServAdv(this.additionalServiceList,this.advActionReturn.id,options).subscribe();
          this.router.navigate(['profile-adventure-fishing-class/',this.adventureId]);
    }); 

  }

}
