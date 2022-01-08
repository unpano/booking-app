import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ReservationType } from '../dto/enums/ReservationType';
import { Reservation } from '../dto/reservation';
import { Endpoint } from '../util/endpoints-enum';

@Component({
  selector: 'app-new-reservation',
  templateUrl: './new-reservation.component.html',
  styleUrls: ['./new-reservation.component.css']
})
export class NewReservationComponent implements OnInit {

  username !: String
  pickPeriod !: FormGroup;
  endpoint = Endpoint

  reservation : Reservation = new Reservation()
  reservationType !: ReservationType 

  actions : any

  constructor(private router: Router, private http: HttpClient) { 
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    this.pickPeriod = new FormGroup({
      start: new FormControl(new Date(year, month, 11)),
      end: new FormControl(new Date(year, month, 15)),
    });
  }

  ngOnInit(): void {
    //find all actions for cottage
    const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };

    this.http
        .get(this.endpoint.RESERVATIONS + sessionStorage.getItem('cottageId'),options)
          .pipe(
            map(returnedActions => {
              this.actions = returnedActions
            })).subscribe()
  }

  reserve(){

    if(sessionStorage.getItem('role') == 'ROLE_COTTAGE_OWNER'){
      this.reservation.reservationType = ReservationType.COTTAGE
    }
    this.reservation.startTime = this.pickPeriod.value["start"]
    this.reservation.endTime = this.pickPeriod.value["end"]

    const headers = { 'content-type': 'application/json',
                      'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };
    
    const body=JSON.stringify(this.reservation);
    console.log(body)
    
  //create new reservation
    this.http.post<any>(this.endpoint.RESERVATIONS + this.username +
                                                      "/" + sessionStorage.getItem("cottageId") + "/" + false, body, options).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
          alert("Bad request, please try again later.");
        } else {
          if(sessionStorage.getItem('cottageId') == undefined)
            this.router.navigate(["login"])
          alert("Conficting period.");
        }

        return EMPTY;
      })
    ).subscribe( )
    
  }

  reserveAction(id: Number){
    const headers = { 'content-type': 'application/json',
                      'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };
    
    this.http.put<any>(this.endpoint.RESERVATIONS + id +
                                                      "/" + this.username,null, options).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
          alert("Bad request, please try again later.");
        } else {
          alert("Action does not exist.");
        }

        return EMPTY;
      })
    ).subscribe( )
  }

}
