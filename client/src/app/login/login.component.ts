import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Credentials } from '../dto/credentials';
import { Endpoint } from '../util/endpoints-enum';
import { Global } from '../util/global';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username!: string;
  password!: string;
  credentials: Credentials = new Credentials();
  endpoint = Endpoint;

  constructor(private router: Router,private http: HttpClient) { }

  ngOnInit(): void {
  }

  login(){
    const headers = { 'content-type': 'application/json'}  
    let options = { headers: headers };

    this.credentials.username = this.username
    this.credentials.password = this.password

    const body=JSON.stringify(this.credentials);  
    
    if(body == "{}"){
      alert("Please enter both fields.")
      return
    }
    
    this.http.post<any>(this.endpoint.LOGIN, body, options).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
          alert("Bad request, please try again later.");
        } else {
          alert("User with username " + this.credentials.username + " does not exist.");
        }
        return EMPTY;
      }),
      map((returnedToken: { [x: string]: string; }) => { 
          
          sessionStorage.setItem("token", returnedToken["access_token"]);
          sessionStorage.setItem("timeOut", returnedToken["expires_in"]);
          sessionStorage.setItem("role", returnedToken["role"]);
          sessionStorage.setItem("id", returnedToken["id"])
     
      })).subscribe( () => {
          if (sessionStorage.getItem('role') == "ROLE_COTTAGE_OWNER"){
            this.router.navigate(['cottageOwner'])
          }
          if (sessionStorage.getItem('role') == "ROLE_BOAT_OWNER"){
            this.router.navigate(['boatOwner'])
          }
          if (sessionStorage.getItem('role') == "ROLE_INSTRUCTOR"){
            this.router.navigate(["instructor"])
          }
          if (sessionStorage.getItem('role') == "ROLE_CLIENT"){
            this.router.navigate(["client"])
          }
          if (sessionStorage.getItem('role') == "ROLE_ADMIN"){
            this.router.navigate(["admin"])
          }
      })
  }

}
