import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Endpoint } from '../util/endpoints-enum';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Cottage } from '../dto/cottage';
import { Global } from '../util/global';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-free-cottages',
  templateUrl: './free-cottages.component.html',
  styleUrls: ['./free-cottages.component.css']
})
export class FreeCottagesComponent implements OnInit {
  
  endpoint = Endpoint
  searchText : any
  cottages: any

  sortedData : any

  @Input() startDate : any
  @Input() endDate : any

  constructor(private router: Router,private http: HttpClient) { }

  ngOnInit(): void {

    let params = new HttpParams();
    params = params.append("startTime", this.startDate + "T12:59:11");
    params = params.append("endTime", this.endDate + "T12:59:11");
    
    this.http.get<any>(this.endpoint.FREE_COTTAGES ,{params: params}).pipe(
    map(returnedData=> {
          this.cottages = returnedData
          this.sortedData = this.cottages.slice()
    })).subscribe()

  }


  cottageDetails(cottage : Cottage)
  {
    Global.cottage = cottage;
    this.router.navigate(["cottage"]);

  }

  sortData(sort: Sort) 
  {
    const data = this.cottages.slice();
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

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
