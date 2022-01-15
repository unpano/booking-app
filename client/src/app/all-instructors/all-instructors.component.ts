import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Instructor } from '../dto/instructor';
import { Endpoint } from '../util/endpoints-enum';
import { Global } from '../util/global';

@Component({
  selector: 'app-all-instructors',
  templateUrl: './all-instructors.component.html',
  styleUrls: ['./all-instructors.component.css']
})
export class AllInstructorsComponent implements OnInit {

  endpoint = Endpoint
  instructors: any;
  sortedData: any

  @Input() searchText : any

  constructor(private router: Router,private http: HttpClient) { }


  ngOnInit(): void 
  {
    
    const headers = { 'content-type': 'application/json'} 
    let options = { headers: headers };

    this.http.get<any>(this.endpoint.ALL_INSTRUCTORS, options).pipe(
      map(returnedData => {
        this.instructors = returnedData
        this.sortedData = this.instructors.slice()
      })).subscribe()

  }

  instructorDetails(i : Instructor)
  {
    Global.instructor = i;
    this.router.navigate(["instructorProfile"]);
  }

  sortData(sort: Sort) 
  {
    const data = this.instructors.slice();
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
