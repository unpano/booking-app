import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Boat } from '../dto/boat';
import { Endpoint } from '../util/endpoints-enum';
import { Global } from '../util/global';

@Component({
  selector: 'app-profile-boat',
  templateUrl: './profile-boat.component.html',
  styleUrls: ['./profile-boat.component.css']
})
export class ProfileBoatComponent implements OnInit {



  endpoint = Endpoint

  constructor(private router: Router,private http: HttpClient) { }

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

}
