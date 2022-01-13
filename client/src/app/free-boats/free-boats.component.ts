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
  sortedData : any
  reservation : Reservation = new Reservation();
  @Input() startTime : any
  @Input() endTime : any

  constructor(private router: Router,private http: HttpClient) { }

  ngOnInit(): void {

    this.reservation.reservationType = 2;
    this.reservation.startTime = this.startTime

    let params = new HttpParams();
    params = params.append("startTime", this.startTime+ "T12:59:11.332");
    params = params.append("endTime", this.endTime + "T12:59:11.332");
    
    this.http.get<any>(this.endpoint.FREE_BOATS ,{params: params}).pipe(
    map(returnedBoat => {
          this.boats = returnedBoat
    })).subscribe()
  }


  
  sortData(sort: Sort) 
  {
    const data = this.boats.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a : any, b : any) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'address': return compare(a.address, b.address, isAsc);
        case 'city': return compare(a.city, b.city, isAsc);
        case 'rate': return compare(a.rate, b.rate, isAsc);
        default: return 0;
      }
    });
  }


  viewDetails(boat : Boat)
  {
    Global.clickedBoat = boat;
    this.router.navigate(["boat"]);
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
