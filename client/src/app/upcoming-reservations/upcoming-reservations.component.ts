import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Reservation } from '../dto/reservation';
import { Endpoint } from '../util/endpoints-enum';

@Component({
  selector: 'app-upcoming-reservations',
  templateUrl: './upcoming-reservations.component.html',
  styleUrls: ['./upcoming-reservations.component.css']
})
export class UpcomingReservationsComponent implements OnInit {

  reservations : any
  endpoint = Endpoint

  constructor(private router: Router,private http: HttpClient, private dialog: MatDialog) { }

  ngOnInit(): void {


    const headers = { 'content-type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
let options = { headers: headers };

    this.http.get<any>(this.endpoint.UPCOMING_RESERVATIONS + sessionStorage.getItem('id'), options).pipe(
      map(returnedData => {
        this.reservations = returnedData
      })).subscribe()



  }

  upcomingRes()
  {
    this.router.navigate(["upcomingRes"]);
  }

  checkforCancelation(reservation : Reservation, dateTime : string)
  {
    let newDate = new Date(dateTime);
    var _now = new Date(Date.now());

    let timeInMilisec: number = newDate.getTime() - _now.getTime();
    let daysBetweenDates: number = Math.ceil(timeInMilisec / (1000 * 60 * 60 * 24));

    const headers = { 'content-type': 'application/json',
                      'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };


    if(daysBetweenDates > 3)
    {
      this.http.get<any>(this.endpoint.DELETE_RESERVATION + reservation.id, options).pipe(
        map(returnedData => {

        })).subscribe( () =>

        this.http.get<any>(this.endpoint.UPCOMING_RESERVATIONS + sessionStorage.getItem('id'), options).pipe(
          map(returnedData => {
            this.reservations = returnedData
          })).subscribe()

        )
      
    }
    else
    {
      alert('Sorry, The reservation can not be cancelled')
    }
  }

}