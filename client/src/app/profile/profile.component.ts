import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Endpoint } from '../util/endpoints-enum';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  endpoint = Endpoint; 
  editButtonClicked !: boolean

  user : any 
  user1: any

  email !: String
  address !: String
  city !: String
  country !: String
  phoneNumber !: String

  selectedFiles?: FileList;
  previews: string[] = [];
  
  constructor(private router: Router,private http: HttpClient,private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
   
    const headers = { 'content-type': 'application/json',
                      'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };

    this.http.get<any>(this.endpoint.USERS + sessionStorage.getItem('email'), options).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
          alert("Bad request, please try again later.");
        } else {
          alert("User with id " + sessionStorage.getItem('email') + ' does not exist.');
          this.router.navigate(["login"])
        }
        return EMPTY;
      }),
      map(returnedUser => {
        this.user = returnedUser
        this.user1 = returnedUser
      })).subscribe()
  }

  sanitize(imgURL:any) { 
    return this.sanitizer.bypassSecurityTrustUrl(imgURL+ this.user.picture)}

  onSubmit() {
    this.editButtonClicked = false

    //update user info
    const headers = { 'content-type': 'application/json',
                      'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };

    if(this.email != undefined)
      this.user1.email = this.email
    if(this.address != undefined)
      this.user1.address = this.address
    if(this.city != undefined)
      this.user1.city = this.city
    if(this.country != undefined)
      this.user1.country = this.country
    if(this.phoneNumber != undefined)
      this.user1.phoneNumber = this.phoneNumber

    let body = JSON.stringify(this.user1)

    this.http.put<any>(this.endpoint.USERS, body, options).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
          alert("Bad request, please try again later.");
        } else {
          alert("User with username " + this.email + ' already exists.');
          this.router.navigate(["login"])
        }
        return EMPTY;
      })).subscribe()
  }

  clickOnEditButton(){
    this.editButtonClicked = true;
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
    
    this.http.post<any>(this.endpoint.UPLOAD + 'set-profile-picture', formData, options).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
          alert("Bad request, please try again later.");
        } else {
          alert("User with username does not exist.");
        }
        return EMPTY;
      })).subscribe()
    
      
      }  
}
