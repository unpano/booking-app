import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AdventureReservationFormComponent } from '../adventure-reservation-form/adventure-reservation-form.component';
import { Adventure } from '../dto/adventure';
import { Client } from '../dto/client';
import { ClientRate } from '../dto/clientRate';
import { Endpoint } from '../util/endpoints-enum';

@Component({
  selector: 'app-profile-adventure',
  templateUrl: './profile-adventure.component.html',
  styleUrls: ['./profile-adventure.component.css']
})
export class ProfileAdventureComponent implements OnInit {




  endpoint = Endpoint

  constructor(private router: Router,private http: HttpClient, private dialog: MatDialog) { }

  client : Client = new Client()

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
          sessionStorage.setItem('adventureId', adventure.id.toString())

          let dialogRef = this.dialog.open(AdventureReservationFormComponent)
          dialogRef.afterClosed().subscribe();
      
        }

      })


  

  }

}
