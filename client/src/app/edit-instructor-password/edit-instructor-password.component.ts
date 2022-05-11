import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Endpoint } from '../util/endpoints-enum';
import { EditInstructorPasswordService } from './service/edit-instructor-password.service';
import { EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Component({
  selector: 'app-edit-instructor-password',
  templateUrl: './edit-instructor-password.component.html',
  styleUrls: ['./edit-instructor-password.component.css']
})
export class EditInstructorPasswordComponent implements OnInit {

  endpoint = Endpoint;
  instructorId !: Number;
  instructorOldPassword !: String;
  instructorNewPassword !: String;
  instructorReEnterPassword !: String;
  matchPasswords !: Boolean

  sameAsOld !: Boolean;

  
  constructor(private router: Router,
              private activeRoute: ActivatedRoute,
              private editInstructorPasswordService: EditInstructorPasswordService,
              private http:HttpClient) { }

  ngOnInit(): void {
    this.instructorId = this.activeRoute.snapshot.params['id'];
    console.log(this.instructorId);
    
  }

  cancel(instructorId: Number){
    this.router.navigate(['profile-instructor/',instructorId]);
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

    saveChanges(instructorId: Number,instructorNewPassword: String,instructorReEnterPassword : String ){
        //prvo proverim da li je dobro uneta stara sifra
          const headers = { 'content-type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
        let options = { headers: headers };

        this.http.get<any>(this.endpoint.USERS + 'checkPassword/' + this.instructorOldPassword, options).pipe(
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
                  if(this.instructorNewPassword != this.instructorReEnterPassword){
                    alert("Your new password and retuped password are not the same.")
                    return
                    }
                  if(this.instructorNewPassword != undefined && this.instructorNewPassword != this.instructorOldPassword){
                    this.http.put<any>(this.endpoint.USERS + 'changePassword/' + this.instructorNewPassword,null, options1).pipe(
                    catchError((error: HttpErrorResponse) => {
                      if (error.error instanceof Error) {
                      alert("Bad request, please try again later.");
                      } else {
                        alert("Please enter valid new password. At least 8 characters. Number, lower and upper case required.")

                        }
                      return EMPTY;
                     })).subscribe(() => {
                        alert("Successfully updated password.")
                        this.router.navigate(['profile-instructor/',instructorId]);
                    })
                      } else if(this.instructorNewPassword == this.instructorOldPassword){
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
