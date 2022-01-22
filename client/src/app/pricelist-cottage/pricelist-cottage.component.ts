import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Endpoint } from '../util/endpoints-enum';

@Component({
  selector: 'app-pricelist-cottage',
  templateUrl: './pricelist-cottage.component.html',
  styleUrls: ['./pricelist-cottage.component.css']
})
export class PricelistCottageComponent implements OnInit {

  services : any

  boatId : any
  endpoint = Endpoint

  constructor(private router: Router,private http: HttpClient) { }


  ngOnInit(): void 
  {

    
    const headers = { 'content-type': 'application/json'} 
    let options = { headers: headers };


    this.http.get<any>(this.endpoint.COTTAGE_SERVICES + sessionStorage.getItem('entityId') , options).pipe(
      map(returnedData => {
        this.services = returnedData
      })).subscribe()

  }



}
