import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ReservationType } from '../dto/enums/ReservationType';
import { Reservation } from '../dto/reservation';
import { Endpoint } from '../util/endpoints-enum';

@Component({
  selector: 'app-new-action',
  templateUrl: './new-action.component.html',
  styleUrls: ['./new-action.component.css']
})
export class NewActionComponent implements OnInit {

  username !: String
  pickPeriod !: FormGroup;
  endpoint = Endpoint

  reservation : Reservation = new Reservation()
  reservationType !: ReservationType 

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
  }

  createAction(){
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
                                                      "/" + sessionStorage.getItem("cottageId") + "/" + true, body, options).pipe(
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
}
