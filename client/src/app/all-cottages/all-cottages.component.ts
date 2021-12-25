import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Endpoint } from '../util/endpoints-enum';

@Component({
  selector: 'app-all-cottages',
  templateUrl: './all-cottages.component.html',
  styleUrls: ['./all-cottages.component.css']
})
export class AllCottagesComponent implements OnInit {

  
  endpoint = Endpoint

  constructor(private router: Router,private http: HttpClient) { }

   cottages: any;

  ngOnInit(): void {

    const headers = { 'content-type': 'application/json'} 

    let options = { headers: headers };

    this.http.post<any>(this.endpoint.ALL_COTTAGES, options).subscribe( data =>{
      console.log('Blaaa');
        this.cottages = data;} 
    )

  }

}
