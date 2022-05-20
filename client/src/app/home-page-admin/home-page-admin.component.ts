import { getLocaleDirection } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { Endpoint } from '../util/endpoints-enum';
import { HomePageAdminService } from './service/home-page-admin.service';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-home-page-admin',
  templateUrl: './home-page-admin.component.html',
  styleUrls: ['./home-page-admin.component.css']
})
export class HomePageAdminComponent implements OnInit {

  endpoint = Endpoint;
  otherAdminOldPassword !: String;
  otherAdminNewPassword !: String;
  otherAdminReEnterPassword !: String;
  matchPasswords !: Boolean

  sameAsOld !: Boolean;

  private baseURL = "http://localhost:8084/instructors/";
  constructor(private http:HttpClient,
              private homePageAdminService: HomePageAdminService,
              private router:Router) { }

 

  firstAdmin : Boolean = false;
  changedPasswordOtherAdmin : Boolean = false;
  otherAdmin : Boolean = false;
  ngOnInit(): void {
    const headers = { 'content-type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
        let options = { headers: headers };

    this.homePageAdminService.checkIfAdminIsOther(options).subscribe(data=>{
        this.otherAdmin = Object.assign(data);
        console.log(this.otherAdmin);
        if(this.otherAdmin==false){
          this.firstAdmin = true;
        } else{
          this.firstAdmin = false;
        }

        if(this.otherAdmin==true){
          this.homePageAdminService.checkIfOtherAdminChangedPassword(options).subscribe(data=>{
              this.changedPasswordOtherAdmin = Object.assign(data);
              console.log(this.changedPasswordOtherAdmin);
          })
       }

    })

    
  }



  oldPasswordFunction() {
    var x !: any;
    x = document.getElementById("oldPassword");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
  
  newPasswordFunction() {
    var x !: any;
    x = document.getElementById("newPassword");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  reEnternewPasswordFunction() {
    var x !: any;
    x = document.getElementById("reEnterNewPassword");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

    saveChanges(instructorNewPassword: String,instructorReEnterPassword : String ){
        //prvo proverim da li je dobro uneta stara sifra
          const headers = { 'content-type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
        let options = { headers: headers };

        this.http.get<any>(this.endpoint.USERS + 'checkPassword/' + this.otherAdminOldPassword, options).pipe(
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

                //ovo je provera ako se lozinke ne poklapaju
                  if(this.otherAdminNewPassword != this.otherAdminReEnterPassword){
                    alert("Your new password and retuped password are not the same.")
                    return
                    }
                  if(this.otherAdminNewPassword != undefined && this.otherAdminNewPassword != this.otherAdminOldPassword){
                    this.http.put<any>(this.endpoint.USERS + 'changePassword/' + this.otherAdminNewPassword,null, options1).pipe(
                    catchError((error: HttpErrorResponse) => {
                      if (error.error instanceof Error) {
                      alert("Bad request, please try again later.");
                      } else {
                        alert("Please enter valid new password. At least 8 characters. Number, lower and upper case required.")

                        }
                      return EMPTY;
                     })).subscribe(() => {
                        alert("Successfully updated password.")
                        this.homePageAdminService.checkIfAdminIsOther(options).subscribe(data=>{
                          this.otherAdmin = Object.assign(data);
                          console.log(this.otherAdmin);
                          if(this.otherAdmin==false){
                            this.firstAdmin = true;
                          } else{
                            this.firstAdmin = false;
                          }
                  
                          if(this.otherAdmin==true){
                            this.homePageAdminService.checkIfOtherAdminChangedPassword(options).subscribe(data=>{
                                this.changedPasswordOtherAdmin = Object.assign(data);
                                console.log(this.changedPasswordOtherAdmin);
                            })
                         }
                  
                      })

                        window.setInterval('document.location.reload()', 1000);
                    })
                      } else if(this.otherAdminNewPassword == this.otherAdminOldPassword){
                        alert("Your new password cannot be the same as old.");
                      } else {
                        alert("You didn't entered new password");
                      }

                    }else{
                  alert("That`s not your old password. Please try again.")
                      }
                })

    }

  

}
