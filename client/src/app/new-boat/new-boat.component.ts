import { Time } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Boat } from '../dto/boat';
import { Endpoint } from '../util/endpoints-enum';
import { Global } from '../util/global';

@Component({
  selector: 'app-new-boat',
  templateUrl: './new-boat.component.html',
  styleUrls: ['./new-boat.component.css']
})
export class NewBoatComponent implements OnInit {

  amenities = Global.amenitiesBoat
  services = Global.services
  navigationEquipment = Global.navigationEquipment
  fishingEquipment = Global.fishingEquipment

  name !: String
  length !: Number
  numberOfMotors !: Number
  motorPower !: Number
  maxSpeed !: Number
  address !: string
  description !: String
  capacity !: Number
  oneDayPrice !: Number
  time !: Time

  boat: Boat = new Boat()

  endpoint = Endpoint; 

  selectedFiles?: FileList;
  previews: string[] = [];

  constructor(private router: Router,private http: HttpClient,private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
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

  addNewBoat(){
    //cottage dto object
    this.boat.name = this.name
    this.boat.length = this.length
    this.boat.numberOfMotors = this.numberOfMotors
    this.boat.motorPower = this.motorPower
    this.boat.maxSpeed = this.maxSpeed
    this.boat.address = this.address
    this.boat.description = this.description
    this.boat.capacity = this.capacity
    this.boat.oneDayPrice = this.oneDayPrice
    this.boat.checkout = this.time

    const headers = { 'content-type': 'application/json',
                      'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };
    
    const body=JSON.stringify(this.boat);
    
  //create new cottage
    this.http.post<any>(this.endpoint.BOATS, body, options).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
          alert("Bad request, please try again later.");
        } else {
          alert("You didn`t fill all of the fields. Please try again.");
        }

        return EMPTY;
      }),
      map(returnedBoat => {
        this.boat.id = returnedBoat['id']

})
    ).subscribe( () => {
      //add pictures of boat to db
      this.uploadFiles()
      alert("Successfully created boat profile.")
      this.router.navigate(["boats"])
    })
                      
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

}


