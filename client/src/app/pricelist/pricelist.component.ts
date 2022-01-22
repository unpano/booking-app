import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Endpoint } from '../util/endpoints-enum';

@Component({
  selector: 'app-pricelist',
  templateUrl: './pricelist.component.html',
  styleUrls: ['./pricelist.component.css']
})
export class PricelistComponent implements OnInit {

  services : any

  boatId : any
  endpoint = Endpoint

  constructor(private router: Router,private http: HttpClient) { }


  ngOnInit(): void 
  {

    
    const headers = { 'content-type': 'application/json'} 
    let options = { headers: headers };


    this.http.get<any>(this.endpoint.ALL_SERVICES +  sessionStorage.getItem('reservationType') +'/'+ sessionStorage.getItem('entityId') , options).pipe(
      map(returnedData => {
        this.services = returnedData
      })).subscribe()

  }


}
