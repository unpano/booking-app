import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Endpoint } from '../util/endpoints-enum';

@Component({
  selector: 'app-profile-client',
  templateUrl: './profile-client.component.html',
  styleUrls: ['./profile-client.component.css']
})
export class ProfileClientComponent implements OnInit {

  user: any
  endpoint = Endpoint

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const headers = { 'content-type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
      let options = { headers: headers };

      this.http.get<any>(this.endpoint.USERS + sessionStorage.getItem('clientUsername'), options).pipe(
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

}
