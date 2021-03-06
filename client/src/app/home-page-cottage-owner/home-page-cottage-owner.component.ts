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

  starNames : String[] = []

  constructor(private http: HttpClient,private router: Router) { }

  ngOnInit(): void {

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

  starNamesFunc(rate: Number): String[]{
    this.starNames = []
   
    if(rate == 0){
      this.starNames.push('outline')
      this.starNames.push('outline')
      this.starNames.push('outline')
      this.starNames.push('outline')
      this.starNames.push('outline')
    
    }else if(rate > 0 && rate < 1){
      this.starNames.push('half')
      this.starNames.push('outline')
      this.starNames.push('outline')
      this.starNames.push('outline')
      this.starNames.push('outline')

    }else if(rate >= 1 && rate < 1.5){
      this.starNames.push('rate')
      this.starNames.push('outline')
      this.starNames.push('outline')
      this.starNames.push('outline')
      this.starNames.push('outline')

    }else if (rate >= 1.5 && rate < 2){
      this.starNames.push('rate')
      this.starNames.push('half')
      this.starNames.push('outline')
      this.starNames.push('outline')
      this.starNames.push('outline')

    }else if (rate >= 2 && rate < 2.5){
      this.starNames.push('rate')
      this.starNames.push('rate')
      this.starNames.push('outline')
      this.starNames.push('outline')
      this.starNames.push('outline')

    }else if (rate >= 2.5 && rate < 3){
      this.starNames.push('rate')
      this.starNames.push('rate')
      this.starNames.push('half')
      this.starNames.push('outline')
      this.starNames.push('outline')

    }else if (rate >= 3 && rate < 3.5){
      this.starNames.push('rate')
      this.starNames.push('rate')
      this.starNames.push('rate')
      this.starNames.push('outline')
      this.starNames.push('outline')
      
    }else if (rate >= 3.5 && rate < 4){
      this.starNames.push('rate')
      this.starNames.push('rate')
      this.starNames.push('rate')
      this.starNames.push('half')
      this.starNames.push('outline')

    }else if (rate >= 4 && rate < 4.5){
      this.starNames.push('rate')
      this.starNames.push('rate')
      this.starNames.push('rate')
      this.starNames.push('rate')
      this.starNames.push('outline')

    }else if (rate >= 4.5 && rate < 5){
      this.starNames.push('rate')
      this.starNames.push('rate')
      this.starNames.push('rate')
      this.starNames.push('rate')
      this.starNames.push('half')

    }else if( rate == 5){
      this.starNames.push('rate')
      this.starNames.push('rate')
      this.starNames.push('rate')
      this.starNames.push('rate')
      this.starNames.push('rate')
    }

    console.log(this.starNames)
    return this.starNames
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
