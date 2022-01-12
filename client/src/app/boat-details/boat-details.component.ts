import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Boat } from '../dto/boat';
import { Endpoint } from '../util/endpoints-enum';
import { Global } from '../util/global';

@Component({
  selector: 'app-boat-details',
  templateUrl: './boat-details.component.html',
  styleUrls: ['./boat-details.component.css']
})
export class BoatDetailsComponent implements OnInit {


  endpoint = Endpoint

  constructor(private router: Router,private http: HttpClient) { }

  boat : Boat = new Boat()

  ngOnInit(): void {
    const headers = { 'content-type': 'application/json'} 
    let options = { headers: headers };

    this.http.get<any>(this.endpoint.FIND_BOAT + "/"+ Global.clickedBoat.id, options).pipe(
      map(returnedBoat => {
        this.boat = returnedBoat
      })).subscribe()
  }

}
