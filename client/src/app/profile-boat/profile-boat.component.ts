import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Boat } from '../dto/boat';
import { Client } from '../dto/client';
import { Reservation } from '../dto/reservation';
import { ReservationFormComponent } from '../reservation-form/reservation-form.component';
import { Endpoint } from '../util/endpoints-enum';
import { Global } from '../util/global';

@Component({
  selector: 'app-profile-boat',
  templateUrl: './profile-boat.component.html',
  styleUrls: ['./profile-boat.component.css']
})
export class ProfileBoatComponent implements OnInit {



  endpoint = Endpoint

  constructor(private router: Router,private http: HttpClient, private dialog: MatDialog) { }

  boat : any
  actions : any
  client : Client = new Client()
  
  

  role : any

  ngOnInit(): void {

    this.role = sessionStorage.getItem('role')


    const headers = { 'content-type': 'application/json'} 
    let options = { headers: headers };

    this.http.get<any>(this.endpoint.FIND_BOAT + "/"+ sessionStorage.getItem('entityId'), options).pipe(
      map(returnedBoat => {
        this.boat = returnedBoat
      })).subscribe( () =>
      {


      })

    

  }

  subscribe(boat : Boat)
  {
    const headers = { 'content-type': 'application/json'} 
    let options = { headers: headers };

    this.http.post<any>(this.endpoint.SUBSCRIBE+ boat.id + "/" + sessionStorage.getItem('id'), options).pipe(
      map(returnedBoat => {
        this.boat = returnedBoat
      })).subscribe(() =>
      {
          alert( "You're subscribed on that boat")
      })

  }
  reserve(boat : Boat)
  {
    const headers = { 'content-type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  

    let options = { headers: headers };

    this.http.get<any>(this.endpoint.FIND_CLIENT+ sessionStorage.getItem('id'), options).pipe(
      map(returnedUser => {
        this.client = returnedUser
      })).subscribe(  () => 
      {
        if(this.client.numOfPenalties> 3)
        {
          alert( 'You can not make reservations this month!')
        }
        else
        {
          sessionStorage.setItem('boatId', boat.id.toString())

          let dialogRef = this.dialog.open(ReservationFormComponent)
          dialogRef.afterClosed().subscribe();
      
        }

      })
  
  }

}
