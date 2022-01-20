import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { BoatSubscriptions } from '../dto/boatSubscription';
import { Endpoint } from '../util/endpoints-enum';

@Component({
  selector: 'app-subscribed-boats',
  templateUrl: './subscribed-boats.component.html',
  styleUrls: ['./subscribed-boats.component.css']
})
export class SubscribedBoatsComponent implements OnInit {

  endpoint = Endpoint

  boatSubscriptions : any

  boats : any


  constructor(private router: Router,private http: HttpClient, private dialog: MatDialog) { }

  ngOnInit(): void {

    const headers = { 'content-type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  

    let options = { headers: headers };

    this.http.get<any>(this.endpoint.FIND_BOAT_SUBSCRIPTIONS + sessionStorage.getItem('id'), options).pipe(
        map(returnedData=> {
             this.boatSubscriptions = returnedData
    })).subscribe()
  }

  unsubscribe(boatSubscriptions : BoatSubscriptions)
  {
    const headers = { 'content-type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  

    let options = { headers: headers };

    this.http.get<any>(this.endpoint.UNSUBSCRIBE + boatSubscriptions.id , options).pipe(
      map(returnedData=> 
        {
              this.http.get<any>(this.endpoint.FIND_BOAT_SUBSCRIPTIONS + sessionStorage.getItem('id'), options).pipe(
                map(returnedData=> {
                    this.boatSubscriptions = returnedData
            })).subscribe()
        })).subscribe()
  }



}
