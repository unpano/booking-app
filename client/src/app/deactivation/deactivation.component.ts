import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Endpoint } from '../util/endpoints-enum';

@Component({
  selector: 'app-deactivation',
  templateUrl: './deactivation.component.html',
  styleUrls: ['./deactivation.component.css']
})
export class DeactivationComponent implements OnInit {

  endpoint = Endpoint;
  description !: String

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
  }

  onSubmit() {
    //salje se zahtev za brisanje profila
    const headers = { 'content-type': 'application/json',
                      'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };

    this.http.post<any>(this.endpoint.USERS + 'deactivation/' +  this.description,null, options).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
          alert("Bad request, please try again later.");
        } else {
          alert("User with username " + sessionStorage.getItem('email') + ' has already sent deactivation request.');
        }
        return EMPTY;
      })).subscribe(() => alert("Successfully sent request for deleting profile."))
  }

  cancel(){
      this.router.navigate(["profile"])
  }

}
