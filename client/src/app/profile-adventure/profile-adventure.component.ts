import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AdventureReservationFormComponent } from '../adventure-reservation-form/adventure-reservation-form.component';
import { Adventure } from '../dto/adventure';
import { Endpoint } from '../util/endpoints-enum';

@Component({
  selector: 'app-profile-adventure',
  templateUrl: './profile-adventure.component.html',
  styleUrls: ['./profile-adventure.component.css']
})
export class ProfileAdventureComponent implements OnInit {




  endpoint = Endpoint

  constructor(private router: Router,private http: HttpClient, private dialog: MatDialog) { }

  adventure : any
  actions : any
  
  role : any

  ngOnInit(): void {

    this.role = sessionStorage.getItem('role')


    const headers = { 'content-type': 'application/json'} 
    let options = { headers: headers };

    this.http.get<any>(this.endpoint.FIND_ADVENTURE+ "/" + sessionStorage.getItem('entityId'), options).pipe(
      map(returnedBoat => {
        this.adventure= returnedBoat
      })).subscribe()


      this.http.get<any>(this.endpoint.ACTIONS + sessionStorage.getItem('entityId'), options).pipe(
        map(returnedData => {
          this.actions = returnedData
        })).subscribe()


  }

  
  subscribe(adventure : Adventure)
  {
    const headers = { 'content-type': 'application/json'} 
    let options = { headers: headers };

    this.http.post<any>(this.endpoint.SUBSCRIBE+ adventure.id + "/" + sessionStorage.getItem('id'), options).pipe(
      map(returnedBoat => {
        this.adventure = returnedBoat
      })).subscribe(() =>
      {
          alert( "You're subscribed on that boat")
      })

  }
  reserve( adventure : Adventure)
  {
    sessionStorage.setItem('boatId', adventure.id.toString())

    let dialogRef = this.dialog.open(AdventureReservationFormComponent)
    dialogRef.afterClosed().subscribe();

  }

}
