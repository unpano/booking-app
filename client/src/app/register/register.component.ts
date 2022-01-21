import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MailDTO } from '../dto/mailDTO';
import { User } from '../dto/user';
import { Endpoint } from '../util/endpoints-enum';
import { Global } from '../util/global';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name !: String
  surname !: String
  email !: string
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

    sessionStorage.setItem('email', this.email)
    Global.email = this.email

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
      map(returnedPersonId => 
          {
            //after sign up send email
            if(confirm("Successfully created account, we sent you activation link on your email!")) 
            { 

            }

          })
    ).subscribe( () => 
                      {
                        alert(this.email)
                        
                        let mail = new MailDTO()
                        mail.mailFrom = "isaBooking56@gmail.com"
                        mail.mailTo = this.email
                        mail.mailSubject = "-ACTIVATION MAIL-"
                        mail.mailContent = "Here is activation link http://localhost:4200/profile-activation . Kind requards, Isa Team 56."
                      

                        const headers = { 'content-type': 'application/json',
                        'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
                      
                        let options = { headers: headers };
                        let body = JSON.stringify(mail)
                        this.http.post<any>(this.endpoint.MAIL + "send-mail",body, options).pipe().subscribe();

                      })

  }

  confirmPassword(){
    if(this.password != this.rePassword || this.rePassword == undefined)
      return 1
    else return 0
  }



}
