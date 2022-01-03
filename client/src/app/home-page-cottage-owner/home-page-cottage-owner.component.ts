import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Endpoint } from '../util/endpoints-enum';
import { map } from 'rxjs/operators';
import { Cottage } from '../dto/cottage';
import { Global } from '../util/global';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-home-page-cottage-owner',
  templateUrl: './home-page-cottage-owner.component.html',
  styleUrls: ['./home-page-cottage-owner.component.css']
})
export class HomePageCottageOwnerComponent implements OnInit {

  cottage: any
  cottages: any
  sortedData: any
  searchText: any
  endpoint = Endpoint;

  constructor(private http: HttpClient,private router: Router) { }

  ngOnInit(): void {
    //if token expired
    if(sessionStorage.getItem('token') == null){
      this.router.navigate([''])
    }

    //list of owner cottages
    const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };

    this.http
        .get(this.endpoint.COTTAGES,options)
          .pipe(
            map(returnedCottages=> {
              this.cottages = returnedCottages
              this.sortedData = this.cottages.slice()
            })).subscribe()
  }

  cottageDetails(cottage: Cottage){
    sessionStorage.setItem('cottageId', cottage.id.toString())
    this.router.navigate(['cottage'])

  }

  sortData(sort: Sort) {
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
