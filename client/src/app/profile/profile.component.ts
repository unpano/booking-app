import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Endpoint } from '../util/endpoints-enum';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  endpoint = Endpoint; 
  user : any 
  editButtonClicked !: boolean

  constructor(private router: Router,private http: HttpClient) { }

  ngOnInit(): void {
    const headers = { 'content-type': 'application/json',
                      'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };

    this.http.get<any>(this.endpoint.PROFILE + sessionStorage.getItem('email'), options).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
          alert("Bad request, please try again later.");
        } else {
          alert("User with id " + sessionStorage.getItem('email') + ' does not exist.');
        }
        return EMPTY;
      }),
      map(returnedUser => {
        this.user = returnedUser
      })).subscribe()
  }

  onSubmit() {
    this.editButtonClicked = false
  }

  clickOnEditButton(){
    this.editButtonClicked = true;
  }


}
