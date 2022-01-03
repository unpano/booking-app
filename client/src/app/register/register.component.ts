import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../dto/user';
import { Endpoint } from '../util/endpoints-enum';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name !: String
  surname !: String
  email !: String
  password !: String
  rePassword !: String
  address !: String
  city !: String
  country !: String
  phone !: String
  reason !: String
  role !: String
  options = [{id:1,name:"ROLE_CLIENT"}]

  endpoint = Endpoint

  constructor(private router: Router,private http: HttpClient) { }

  ngOnInit(): void {
  }

  selectClient(){
    this.role = "ROLE_CLIENT"
  }
  selectCottageOwner(){
    this.role = "ROLE_COTTAGE_OWNER"
  }
  selectBoatOwner(){
    this.role = "ROLE_BOAT_OWNER"
  }
  selectInstructor(){
    this.role = "ROLE_INSTRUCTOR"
  }

  signUp(){
    let user: User = new User
    user.email = this.email
    user.password = this.password
    user.firstName = this.name
    user.lastName = this.surname
    user.address = this.address
    user.city = this.city
    user.country = this.country
    user.phoneNumber = this.phone
    user.reason = this.reason
    user.userType = this.role

    const headers = { 'content-type': 'application/json'} 
    
    const body=JSON.stringify(user);
    
    let options = { headers: headers };
    this.http.post<any>(this.endpoint.SIGNUP, body, options).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
          alert("Bad request, please try again later.");
        } else {
          alert("Username is not unique or you didn`t fill all of the fields. Please try again.");
        }

        return EMPTY;
      }),
      map(returnedPersonId => {
        //after sign up redirect to login
        if(confirm("Successfully created account.")) {
          this.router.navigate(["login"]);}

})
    ).subscribe()
  }

  confirmPassword(){
    if(this.password != this.rePassword || this.rePassword == undefined)
      return 1
    else return 0
  }



}
