import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Endpoint } from '../util/endpoints-enum';

@Component({
  selector: 'app-all-adventures',
  templateUrl: './all-adventures.component.html',
  styleUrls: ['./all-adventures.component.css']
})
export class AllAdventuresComponent implements OnInit {

  endpoint = Endpoint
  searchText : any
  adventures: any;
  sortedData: any

  constructor(private router: Router,private http: HttpClient) { }


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


}
