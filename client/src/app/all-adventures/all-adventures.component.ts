import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Adventure } from '../dto/adventure';
import { PricelistComponent } from '../pricelist/pricelist.component';
import { Endpoint } from '../util/endpoints-enum';

@Component({
  selector: 'app-all-adventures',
  templateUrl: './all-adventures.component.html',
  styleUrls: ['./all-adventures.component.css']
})
export class AllAdventuresComponent implements OnInit {

  
  endpoint = Endpoint
  adventures: any;
  sortedData: any

  @Input() searchText : any

  constructor(private router: Router,private http: HttpClient, private dialog: MatDialog) { }


  ngOnInit(): void 
  {
    
    const headers = { 'content-type': 'application/json'} 
    let options = { headers: headers };

    this.http.get<any>(this.endpoint.ALL_COTTAGES, options).pipe(
      map(returnedData => {
        this.adventures = returnedData
        this.sortedData = this.adventures.slice()
      })).subscribe()

  }


  adventureDetails(adventure : Adventure)
  {
    sessionStorage.setItem('entityId', adventure.id.toString())
    this.router.navigate(["adventure"]);
  }

  actions(adventure : Adventure)
  {
    sessionStorage.setItem('entityId', adventure.id.toString())
    this.router.navigate(["actions"]);
  }



  pricelist(adventure : Adventure)
  {
    sessionStorage.setItem('boatId', adventure.id.toString())

    let dialogRef = this.dialog.open(PricelistComponent)
    dialogRef.afterClosed().subscribe();
  }

  sortData(sort: Sort) 
  {
    const data = this.adventures.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a : any, b : any) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'address': return compare(a.address, b.address, isAsc);
        case 'rate': return compare(a.rate, b.rate, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
