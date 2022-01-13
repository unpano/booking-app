import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AmenityJSON } from '../dto/amenitiyJSON';
import { Room } from '../dto/Room';
import { RuleJSON } from '../dto/RuleJSON';
import { DateFilterService } from '../util/dateFIlterService';
import { Endpoint } from '../util/endpoints-enum';
import { Global } from '../util/global';

@Component({
  selector: 'app-profile-cottage',
  templateUrl: './profile-cottage.component.html',
  styleUrls: ['./profile-cottage.component.css']
})
export class ProfileCottageComponent implements OnInit {
  name !: String
  address !: String
  city !: String
  description !: String
  maxNumPers !: Number
  oneDayPrice !: Number

  roomName !: String
  roomBadTypes !: String

  editButtonClicked !: boolean

  imgCollection: Array<object> = [];

  endpoint = Endpoint
  cottage:any

  amenities : AmenityJSON[] = []
  rules : RuleJSON[] = []
  
  services = Global.services
  amenities1 = Global.amenities

  selectedFiles?: FileList;
  previews: string[] = [];

  selected !: Date | null;

  starNames : String[] = []

  constructor(private router: Router,private sanitizer: DomSanitizer, private http: HttpClient, private dateService: DateFilterService) { 
    
  }

  ngOnInit(): void {

    this.dateService.findForbiddenDate()

    //cottage details
    const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };

    if(sessionStorage.getItem('cottageId') == undefined)
      this.router.navigate(["login"])

    this.http
        .get(this.endpoint.COTTAGES + sessionStorage.getItem('cottageId') ,options)
          .pipe(
            map(returnedCottage=> {
              this.cottage = returnedCottage              
            })).subscribe(() =>
            {
              this.cottage.amenities.forEach((amenityInCottage: string) => {
                    var amenityJSON = this.findAmenity(amenityInCottage)
                    this.amenities.push(amenityJSON)
              });

              this.cottage.additionalServices.forEach((rule: string) => {
                var ruleJSON = this.findRule(rule)
                this.rules.push(ruleJSON)
          });
              
              //cottage images in imgCollection
              this.http
                  .get(this.endpoint.COTTAGES + sessionStorage.getItem('cottageId') + '/images' ,options)
                    .pipe(
                      map(returnedImages=> {
                        let imageUrls : any
                        imageUrls = returnedImages
                        imageUrls.forEach((path: string) => {
                          let obj = {
                            image: 'assets/cottage-pictures/'+ path,
                            thumbImage: 'assets/cottage-pictures/'+ path
                          }
                          this.imgCollection.push(obj)
                        });
                      })).subscribe()
            })  
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

    console.log(this.starNames)
    return this.starNames
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

  editCottage(){
    this.editButtonClicked = true
  }

  onSubmit(){
    this.uploadFiles()
    
      this.editButtonClicked = false
  
      //update cottage
      const headers = { 'content-type': 'application/json',
                        'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
      let options = { headers: headers };
  
      if(this.name != undefined)
        this.cottage.name = this.name
      if(this.address != undefined)
        this.cottage.address = this.address
      if(this.city != undefined)
        this.cottage.city = this.city
      if(this.oneDayPrice != undefined)
        this.cottage.oneDayPrice = this.oneDayPrice
      if(this.description != undefined)
        this.cottage.description = this.description

      this.cottage.id = sessionStorage.getItem("cottageId")

      let body = JSON.stringify(this.cottage)
  
      this.http.put<any>(this.endpoint.COTTAGES, body, options).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof Error) {
            alert("Bad request, please try again later.");
          } else {
            alert("Cottage has reservations, you can not change its data.")
          }
          return EMPTY;
        })).subscribe()
    }

    deleteRoom(roomId: Number){
      const headers = { 'content-type': 'application/json',
                      'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
      let options = { headers: headers };

      this.http.delete<any>(this.endpoint.COTTAGES +  sessionStorage.getItem('cottageId') + '/delete-room/' + roomId,options).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof Error) {
            alert("Bad request, please try again later.");
          } else {
            alert("Cottage is or has been reserved and could not be deleted.");
          }
          return EMPTY;
        })).subscribe(() => alert("Room is deleted."))

    }

    addRoom(){
      let room : Room = new Room()
      room.name = this.roomName
      room.bedTypes = this.roomBadTypes

      const headers = { 'content-type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
      let options = { headers: headers };

      
      let body = JSON.stringify(room)

      this.http.post<any>(this.endpoint.ROOMS, body, options).pipe(
        catchError((error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
        alert("Bad request, please try again later.");
        } else {
        alert("Cottage has reservations, you can not change its data.")
        }
       return EMPTY;
      }),
      map(returnedRoom =>{

        room.id = returnedRoom["id"]

      })).subscribe(() =>{
        this.cottage.id = sessionStorage.getItem("cottageId")
        this.cottage.rooms.push(room)

        let body = JSON.stringify(this.cottage)

        this.http.put<any>(this.endpoint.COTTAGES, body, options).pipe(
          catchError((error: HttpErrorResponse) => {
          if (error.error instanceof Error) {
          alert("Bad request, please try again later.");
          } else {
          alert("Cottage has reservations, you can not change its data.")
          }
        return EMPTY;
        })).subscribe()
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
      
      this.http.post<any>(this.endpoint.UPLOAD + 'add-cottage-picture/' + this.cottage.id, formData, options)
              .subscribe()
      
        
        }  
  }

