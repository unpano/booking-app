import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Cottage } from '../dto/cottage';
import { PricelistCottageComponent } from '../pricelist-cottage/pricelist-cottage.component';
import { PricelistComponent } from '../pricelist/pricelist.component';
import { Endpoint } from '../util/endpoints-enum';
import { Global } from '../util/global';

@Component({
  selector: 'app-all-cottages',
  templateUrl: './all-cottages.component.html',
  styleUrls: ['./all-cottages.component.css']
})
export class AllCottagesComponent implements OnInit {

  endpoint = Endpoint
  cottages: any;
  cottage: any
  sortedData: any

  @Input() searchText : any

  constructor(private router: Router,private http: HttpClient, private dialog: MatDialog) { }


  ngOnInit(): void 
  {
    
    const headers = { 'content-type': 'application/json'} 
    let options = { headers: headers };

    this.http.get<any>(this.endpoint.ALL_COTTAGES, options).pipe(
      map(returnedCottages => {
        this.cottages = returnedCottages
        this.sortedData = this.cottages.slice()
      })).subscribe()

  }

  cottageProfile(cottage : Cottage)
  {

    sessionStorage.setItem('cottageId', cottage.id.toString())
    this.router.navigate(["cottageProfile"]);
  }

  actions(cottage : Cottage)
  {
    sessionStorage.setItem('reservationType', 'COTTAGE')
    sessionStorage.setItem('entityId', cottage.id.toString())
    this.router.navigate(["actions"]);
  }



  pricelist(cottage : Cottage)
  {
    sessionStorage.setItem('entityId', cottage.id.toString())

    let dialogRef = this.dialog.open(PricelistCottageComponent)
    dialogRef.afterClosed().subscribe();
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



