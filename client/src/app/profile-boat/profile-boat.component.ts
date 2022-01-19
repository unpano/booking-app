import { Time } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AmenityJSON } from '../dto/amenitiyJSON';
import { Boat } from '../dto/boat';
import { EquipmentJSON } from '../dto/EquimentJSON';
import { RuleJSON } from '../dto/RuleJSON';
import { DateFilterService } from '../util/dateFIlterService';
import { Endpoint } from '../util/endpoints-enum';
import { Global } from '../util/global';

@Component({
  selector: 'app-profile-boat',
  templateUrl: './profile-boat.component.html',
  styleUrls: ['./profile-boat.component.css']
})
export class ProfileBoatComponent implements OnInit {

  amenities : AmenityJSON[] = []
  rules : RuleJSON[] = []
  fishEquipment : EquipmentJSON[] = []
  navEquipment : EquipmentJSON[] = []

  boat : any
  endpoint = Endpoint

  name !: String
  length !: Number
  numberOfMotors !: Number
  motorPower !: Number
  maxSpeed !: Number
  address !: String
  description !: String
  capacity !: Number
  editButtonClicked !: boolean
  services = Global.services
  amenities1 = Global.amenitiesBoat
  eq1 = Global.navigationEquipment
  eq2 = Global.fishingEquipment
  oneDayPrice !: Number
  
  time !: Time

  selectedFiles?: FileList;
  previews: string[] = [];

  selected !: Date | null;

  starNames : String[] = []
  
  imgCollection: Array<object> = [];

  constructor(private router: Router,private sanitizer: DomSanitizer, private http: HttpClient, 
    private dateService: DateFilterService) { 
    
  }

  ngOnInit(): void {

    this.dateService.findForbiddenDatesBoat()

    //boat details
    const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };

    if(sessionStorage.getItem('boatId') == undefined)
      this.router.navigate(["login"])

    this.http
        .get(this.endpoint.BOATS + sessionStorage.getItem('boatId') ,options)
          .pipe(
            map(returnedBoat => {
              this.boat = returnedBoat             
            })).subscribe(() =>
            {
              this.boat.amenities.forEach((amenityInBoat: string) => {
                    var amenityJSON = this.findAmenity(amenityInBoat)
                    this.amenities.push(amenityJSON)
              });

              this.boat.additionalServices.forEach((rule: string) => {
                var ruleJSON = this.findRule(rule)
                this.rules.push(ruleJSON)
               });
               this.boat.fishingEquipment.forEach((eq: string) => {
                var eqJSON = this.findEquipment(eq,"fish")
                this.fishEquipment.push(eqJSON)
               });
               this.boat.navigationEquipment.forEach((eq: string) => {
                var eqJSON = this.findEquipment(eq,"nav")
                this.navEquipment.push(eqJSON)
               });
              
              //cottage images in imgCollection
              this.http
                  .get(this.endpoint.BOATS + sessionStorage.getItem('boatId') + '/images' ,options)
                    .pipe(
                      map(returnedImages=> {
                        let imageUrls : any
                        imageUrls = returnedImages
                        imageUrls.forEach((path: string) => {
                          let obj = {
                            image: 'assets/boat-pictures/'+ path,
                            thumbImage: 'assets/boat-pictures/'+ path
                          }
                          this.imgCollection.push(obj)
                        });
                      })).subscribe()
            })  
  }

  onSubmit(){
    this.uploadFiles()
    
      this.editButtonClicked = false
  
      //update cottage
      const headers = { 'content-type': 'application/json',
                        'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
      let options = { headers: headers };
  
      if(this.name != undefined)
        this.boat.name = this.name
      if(this.address != undefined)
        this.boat.address = this.address
      if(this.description != undefined)
        this.boat.description = this.description
        if(this.length != undefined)
        this.boat.length = this.length
        if(this.numberOfMotors != undefined)
        this.boat.numberOfMotors = this.numberOfMotors
        if(this.motorPower != undefined)
        this.boat.motorPower = this.motorPower
        if(this.maxSpeed != undefined)
        this.boat.maxSpeed = this.maxSpeed
        if(this.capacity != undefined)
        this.boat.capacity = this.capacity
        if(this.oneDayPrice != undefined)
        this.boat.oneDayPrice = this.oneDayPrice
        if(this.time != undefined)
        this.boat.checkout = this.time

      this.boat.id = sessionStorage.getItem("boatId")

      let body = JSON.stringify(this.boat)
  
      this.http.put<any>(this.endpoint.BOATS, body, options).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof Error) {
            alert("Bad request, please try again later.");
          } else {
            alert("Boat has reservations, you can not change its data.")
          }
          return EMPTY;
        })).subscribe()
  }

  selectFerry(){
    this.boat.boatType = 0
  }
  selectCatamaran(){
    this.boat.boatType = 1
  }
  selectYacht(){
    this.boat.boatType = 2
  }
  selectFree(){
    this.boat.cancelationType = 0
  }
  selectPercentage(){
    this.boat.cancelationType = 1
  }

  private findAmenity(amenityName: string): AmenityJSON{
    
    var amenityJSON = new AmenityJSON()

      Global.amenities.forEach((amenity) => {
        if(amenityName == amenity.value){
          amenityJSON.name = amenity.display
          amenityJSON.icon = amenity.icon
        }
          
      })

      return amenityJSON
  }
  private findRule(ruleName: string): RuleJSON{
    
    var ruleJSON = new RuleJSON()

      Global.services.forEach((rule) => {
        if(ruleName == rule.value){
          ruleJSON.name = rule.display
          ruleJSON.icon = rule.icon
        }
          
      })

      return ruleJSON
  }
  private findEquipment(equipmentName: string, type: String): EquipmentJSON{
    var equipmentJSON = new EquipmentJSON()

    if(type == "nav"){
      Global.navigationEquipment.forEach((eq)=>{
        if(equipmentName == eq.value){
          equipmentJSON.name = eq.display
          equipmentJSON.icon = eq.icon
        }
      })
  
    }else if(type == 'fish'){
      Global.fishingEquipment.forEach((eq)=>{
        if(equipmentName == eq.value){
          equipmentJSON.name = eq.display
          equipmentJSON.icon = eq.icon
        }
      })
  
    }
    
    return equipmentJSON
  }

  editBoat(){
    this.editButtonClicked = true
  }

  selectFiles(event: any): void {
    this.selectedFiles = event.target.files;
  
    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
  
        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
        };
  
        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }
  }

  uploadFiles(): void {
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(this.selectedFiles[i]);
      }
    }
  }

  upload(file: File): void {
  
    const formData: FormData = new FormData(); 
    formData.append('file', file);

    const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };
    
    this.http.post<any>(this.endpoint.UPLOAD + 'add-boat-picture/' + this.boat.id, formData, options)
            .subscribe()
    
      
      }  

      starNamesFunc(rate: Number): String[]{
        this.starNames = []
       
        if(rate == 0){
          this.starNames.push('outline')
          this.starNames.push('outline')
          this.starNames.push('outline')
          this.starNames.push('outline')
          this.starNames.push('outline')
        
        }else if(rate > 0 && rate < 1){
          this.starNames.push('half')
          this.starNames.push('outline')
          this.starNames.push('outline')
          this.starNames.push('outline')
          this.starNames.push('outline')
    
        }else if(rate >= 1 && rate < 1.5){
          this.starNames.push('rate')
          this.starNames.push('outline')
          this.starNames.push('outline')
          this.starNames.push('outline')
          this.starNames.push('outline')
    
        }else if (rate >= 1.5 && rate < 2){
          this.starNames.push('rate')
          this.starNames.push('half')
          this.starNames.push('outline')
          this.starNames.push('outline')
          this.starNames.push('outline')
    
        }else if (rate >= 2 && rate < 2.5){
          this.starNames.push('rate')
          this.starNames.push('rate')
          this.starNames.push('outline')
          this.starNames.push('outline')
          this.starNames.push('outline')
    
        }else if (rate >= 2.5 && rate < 3){
          this.starNames.push('rate')
          this.starNames.push('rate')
          this.starNames.push('half')
          this.starNames.push('outline')
          this.starNames.push('outline')
    
        }else if (rate >= 3 && rate < 3.5){
          this.starNames.push('rate')
          this.starNames.push('rate')
          this.starNames.push('rate')
          this.starNames.push('outline')
          this.starNames.push('outline')
          
        }else if (rate >= 3.5 && rate < 4){
          this.starNames.push('rate')
          this.starNames.push('rate')
          this.starNames.push('rate')
          this.starNames.push('half')
          this.starNames.push('outline')
    
        }else if (rate >= 4 && rate < 4.5){
          this.starNames.push('rate')
          this.starNames.push('rate')
          this.starNames.push('rate')
          this.starNames.push('rate')
          this.starNames.push('outline')
    
        }else if (rate >= 4.5 && rate < 5){
          this.starNames.push('rate')
          this.starNames.push('rate')
          this.starNames.push('rate')
          this.starNames.push('rate')
          this.starNames.push('half')
    
        }else if( rate == 5){
          this.starNames.push('rate')
          this.starNames.push('rate')
          this.starNames.push('rate')
          this.starNames.push('rate')
          this.starNames.push('rate')
        }
    
       // console.log(this.starNames)
        return this.starNames
      }

}
