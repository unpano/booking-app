import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Endpoint } from '../util/endpoints-enum';

@Component({
  selector: 'app-all-boats',
  templateUrl: './all-boats.component.html',
  styleUrls: ['./all-boats.component.css']
})
export class AllBoatsComponent implements OnInit {

  endpoint = Endpoint

  constructor(private router: Router,private http: HttpClient) { }

  boats: any;

  ngOnInit(): void {

    const headers = { 'content-type': 'application/json'} 

    let options = { headers: headers };

    this.http.post<any>(this.endpoint.ALL_BOATS, options).subscribe( data =>{
      console.log('Blaaa');
        this.boats = data;} 
    )

  }
}
