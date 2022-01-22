import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AdditionalService } from '../dto/additionalService';
import { Client } from '../dto/client';
import { Reservation } from '../dto/reservation';
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

  reservation : Reservation = new Reservation()

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


  add(s : AdditionalService)
  {
    const headers = { 'content-type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  

      let options = { headers: headers };
      
    this.http.post<any>(this.endpoint.ADD_SERVICE_TO_RESERVATION + sessionStorage.getItem('reservationId') + "/" + s.id, options).pipe(
      map(returnedUser => {
        this.reservation
      })).subscribe()
  }






}
