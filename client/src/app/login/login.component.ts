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
    const headers = { 'content-type': 'application/json',
    'Access-Control-Allow-Origin':'*'}  
    let options = { headers: headers };

    this.credentials.username = this.username
    this.credentials.password = this.password

    const body=JSON.stringify(this.credentials);  
    
    this.http.post<any>(this.endpoint.LOGIN, body, options).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
          alert("Bad request, please try again later.");
        } else {
          alert("Invalid login. Please try again.");
        }
        return EMPTY;
      }),
      map((returnedToken: { [x: string]: string; }) => { 
          Global.token.access_token = returnedToken["access_token"]
          Global.token.expires_in = returnedToken["expires_in"]
          sessionStorage.setItem("token", Global.token.access_token);
          sessionStorage.setItem("timeOut", Global.token.expires_in);
     
      })).subscribe()
  }

}
