import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
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

  @Input() startDate : any
  @Input() endDate : any

  constructor(private router: Router,private http: HttpClient) { }

  ngOnInit(): void {

      let params = new HttpParams();
      params = params.append("startTime", this.startDate + "T12:59:11");
      params = params.append("endTime", this.endDate + "T12:59:11");
      
      this.http.get<any>(this.endpoint.FREE_BOATS ,{params: params}).pipe(
      map(returnedBoat => {
            this.boats = returnedBoat
      })).subscribe()

  }




  viewDetails(boat : Boat)
  {
    Global.boat = boat;
    this.router.navigate(["boat"]);
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
