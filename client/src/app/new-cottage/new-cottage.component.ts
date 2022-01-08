import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Cottage } from '../dto/cottage';
import { Room } from '../dto/Room';
import { Endpoint } from '../util/endpoints-enum';
import { Global } from '../util/global';

@Component({
  selector: 'app-new-cottage',
  templateUrl: './new-cottage.component.html',
  styleUrls: ['./new-cottage.component.css']
})
export class NewCottageComponent implements OnInit {

  amenities = Global.amenities
  
  services = Global.services

  name !: String
  address !: String
  city !: String
  description !: String
  maxNumPers !: Number
  oneDayPrice !: Number
  roomNum !: Number 
  rooms : Room[] = []

  cottage: Cottage = new Cottage()

  endpoint = Endpoint; 

  selectedFiles?: FileList;
  previews: string[] = [];

  constructor(private router: Router,private http: HttpClient,private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  changeNumOfRooms(){
    this.rooms = []
    for(let i=0; i< this.roomNum;i++){
      var room = new Room()
      this.rooms.push(room)
    }
  }

  addNewCottage(){
    //cottage dto object
      this.cottage.address = this.address
      this.cottage.city = this.city
      this.cottage.name = this.name
      this.cottage.description = this.description
      this.cottage.maxNumOfPersons = this.maxNumPers
      this.cottage.rooms = this.rooms
      this.cottage.oneDayPrice = this.oneDayPrice
      

    const headers = { 'content-type': 'application/json',
                      'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };
    
    const body=JSON.stringify(this.cottage);
    alert(body)
    
  //create new cottage
    this.http.post<any>(this.endpoint.COTTAGES, body, options).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
          alert("Bad request, please try again later.");
        } else {
          if(sessionStorage.getItem('cottageId') == undefined)
            this.router.navigate(["login"])
          alert("You didn`t fill all of the fields. Please try again.");
        }

        return EMPTY;
      }),
      map(returnedCottage => {
        this.cottage.id = returnedCottage['id']

})
    ).subscribe( () => 
                      //add pictures of cottage to db
                      this.uploadFiles())
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
