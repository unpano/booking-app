import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Cottage } from '../dto/cottage';
import { Endpoint } from '../util/endpoints-enum';
import { Global } from '../util/global';

@Component({
  selector: 'app-all-cottages',
  templateUrl: './all-cottages.component.html',
  styleUrls: ['./all-cottages.component.css']
})
export class AllCottagesComponent implements OnInit {

  endpoint = Endpoint
  searchText : any
  cottages: any;

  constructor(private router: Router,private http: HttpClient) { }


  ngOnInit(): void 
  {
    
    const headers = { 'content-type': 'application/json'} 
    let options = { headers: headers };

    this.http.get<any>(this.endpoint.ALL_COTTAGES, options).pipe(
      map(returnedCottages => {
        this.cottages = returnedCottages
      })).subscribe()


  }

  viewDetails(cottage : Cottage)
  {
    Global.clickedCottage = cottage;
    this.router.navigate(["cottageDetails"]);

  }



}
