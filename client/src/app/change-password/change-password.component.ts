import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Endpoint } from '../util/endpoints-enum';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  endpoint = Endpoint;
  oldPassword !: String
  newPassword !: String
  rePassword !: String
  matchPasswords !: Boolean

  constructor(private router: Router,private http: HttpClient) { }

  ngOnInit(): void {
  }

  onSubmit() {
    //prvo proverim da li je dobro uneta stara sifra
    const headers = { 'content-type': 'application/json',
                      'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };

    this.http.get<any>(this.endpoint.USERS + 'checkPassword/' + this.oldPassword, options).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
          alert("Bad request, please try again later.");
        } else {
          alert("User with id " + sessionStorage.getItem('email') + ' does not exist.');
          this.router.navigate(["login"])
        }
        return EMPTY;
      }),
      map(
        matchPass => this.matchPasswords = matchPass
      )).subscribe(() => {
        const headers1 = { 'content-type': 'application/json',
                          'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
        let options1 = { headers: headers1 };

        //ako se lozinke poklapaju moze promeniti na novu
        if(this.matchPasswords){
          //ako je uneta nova promeni
          if(this.newPassword != this.rePassword){
            alert("Passwords do not match.")
            return
          }
          if(this.newPassword != undefined){
            this.http.put<any>(this.endpoint.USERS + 'changePassword/' + this.newPassword,null, options1).pipe(
              catchError((error: HttpErrorResponse) => {
                if (error.error instanceof Error) {
                  alert("Bad request, please try again later.");
                } else {
                  alert("Please enter valid new password. At least 8 characters. Number, lower and upper case required.")
                  
                }
                return EMPTY;
              })).subscribe()
          }
        }else{
          alert("That`s not your old password. Please try again.")
        }
      })
  }

  

}
