import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Boat } from '../dto/boat';
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

  ngOnInit(): void {
    const headers = { 'content-type': 'application/json'} 
    let options = { headers: headers };

    this.http.get<any>(this.endpoint.FIND_BOAT + "/"+ sessionStorage.getItem('entityId'), options).pipe(
      map(returnedBoat => {
        this.boat = returnedBoat
      })).subscribe()


      this.http.get<any>(this.endpoint.ACTIONS + sessionStorage.getItem('entityId'), options).pipe(
        map(returnedData => {
          this.actions = returnedData
        })).subscribe()


  }

  reserve(boat : Boat)
  {
    sessionStorage.setItem('boatId', boat.id.toString())

    let dialogRef = this.dialog.open(ReservationFormComponent)
    dialogRef.afterClosed().subscribe();

  }

}
