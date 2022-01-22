import { HttpClient } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ComplainFormComponent } from '../complain-form/complain-form.component';
import { Boat } from '../dto/boat';
import { ReservationType } from '../dto/enums/ReservationType';
import { Reservation } from '../dto/reservation';
import { RateFormComponent } from '../rate-form/rate-form.component';
import { Endpoint } from '../util/endpoints-enum';

@Component({
  selector: 'app-client-reservations',
  templateUrl: './client-reservations.component.html',
  styleUrls: ['./client-reservations.component.css']
})
export class ClientReservationsComponent implements OnInit {

  reservations : any
  endpoint = Endpoint

  constructor(private router: Router,private http: HttpClient, private dialog: MatDialog) { }

  ngOnInit(): void {


    const headers = { 'content-type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
let options = { headers: headers };

    this.http.get<any>(this.endpoint.MY_RESERVATIONS + sessionStorage.getItem('id'), options).pipe(
      map(returnedData => {
        this.reservations = returnedData
      })).subscribe()



  }


  rate(r : Reservation)
  {
    
    if(r.reservationType == ReservationType.BOAT)
    {
      sessionStorage.setItem('entityId', r.boat.id.toString())
    }
    else if(r.reservationType == ReservationType.COTTAGE)
    {
      sessionStorage.setItem('entityId', r.cottage.id.toString())
    }
    else if(r.reservationType == ReservationType.ADVENTURE)
    {
      sessionStorage.setItem('entityId', r.adventure.id.toString())
    }

    sessionStorage.setItem('reservationType', r.reservationType.toString())

    let dialogRef = this.dialog.open(RateFormComponent)
    dialogRef.afterClosed().subscribe();

  }


  complain(r : Reservation)
  {

    if(r.reservationType == ReservationType.BOAT)
    {
      sessionStorage.setItem('entityId', r.boat.id.toString())
    }
    else if(r.reservationType == ReservationType.COTTAGE)
    {
      sessionStorage.setItem('entityId', r.cottage.id.toString())
    }
    else if(r.reservationType == ReservationType.ADVENTURE)
    {
      sessionStorage.setItem('entityId', r.adventure.id.toString())
    }

    sessionStorage.setItem('reservationType', r.reservationType.toString())

    let dialogRef = this.dialog.open(ComplainFormComponent)
    dialogRef.afterClosed().subscribe();

  }


}
