import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Boat } from '../dto/boat';
import { Reservation } from '../dto/reservation';
import { Endpoint } from '../util/endpoints-enum';
import { Global } from '../util/global';

@Component({
  selector: 'app-free-boats',
  templateUrl: './free-boats.component.html',
  styleUrls: ['./free-boats.component.css']
})
export class FreeBoatsComponent implements OnInit {

  endpoint = Endpoint
  searchText : any
  boats: any

  reservation : Reservation = new Reservation();
  @Input() startTime : any

  constructor(private router: Router,private http: HttpClient) { }

  ngOnInit(): void {


    this.reservation.reservationType = 2;
    this.reservation.startTime = this.startTime

    let params = new HttpParams();
    params = params.append("startTime", this.startTime+ "T12:59:11.332");
    params = params.append("endTime", this.startTime+ "T12:59:11.332");
    
    this.http.get<any>(this.endpoint.FREE_BOATS ,{params: params}).pipe(
    map(returnedBoat => {
          this.boats = returnedBoat
    })).subscribe()
  }

  
  viewDetails(boat : Boat)
  {
    Global.clickedBoat = boat;
    this.router.navigate(["boat"]);
  }

}
