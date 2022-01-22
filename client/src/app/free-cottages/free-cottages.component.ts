import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Endpoint } from '../util/endpoints-enum';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Cottage } from '../dto/cottage';
import { Global } from '../util/global';
import { Sort } from '@angular/material/sort';
import { Reservation } from '../dto/reservation';
import { Client } from '../dto/client';
import { ReservationType } from '../dto/enums/ReservationType';

@Component({
  selector: 'app-free-cottages',
  templateUrl: './free-cottages.component.html',
  styleUrls: ['./free-cottages.component.css']
})
export class FreeCottagesComponent implements OnInit {
  
  endpoint = Endpoint
  cottages: any
  reservation : Reservation = new Reservation()

  client : Client = new Client()
  checkRes : any

  sortedData : any

  @Input() startDate : any
  @Input() endDate : any
  @Input() searchText : any
  @Input() numOfPersons: any

  constructor(private router: Router,private http: HttpClient) { }

  ngOnInit(): void {

    const headers = { 'content-type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  

    let params = new HttpParams();
    params = params.append("startTime", this.startDate + "T12:59:11");
    params = params.append("endTime", this.endDate + "T12:59:11");

    let options = { headers: headers, params : params};

 
    
    this.http.get<any>(this.endpoint.FREE_COTTAGES , options).pipe(
    map(returnedData=> {
          this.cottages = returnedData
          this.sortedData = this.cottages.slice()
    })).subscribe()


    this.http.get<any>(this.endpoint.FIND_CLIENT+ sessionStorage.getItem('id'), options).pipe(
      map(returnedUser => {
        this.reservation.client = returnedUser
  })).subscribe( () => {})

  }


  cottageDetails(cottage : Cottage)
  {
    Global.cottage = cottage;
    this.router.navigate(["cottage"]);

  }

  reserve(cottage : Cottage)
  {
    sessionStorage.setItem('entityId', cottage.id.toString())

    this.reservation.cottage = cottage;
    this.reservation.numOfPersons = this.numOfPersons

    this.reservation.startTime = this.startDate + "T11:00:00"
    this.reservation.endTime = this.endDate + "T11:00:00"

    this.reservation.reservationType = ReservationType.COTTAGE
    this.reservation.price = cottage.price;
  
    const headers = { 'content-type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  

    let options = { headers: headers };

    const body=JSON.stringify(this.reservation); 

    this.http.get<any>(this.endpoint.FIND_CLIENT+ sessionStorage.getItem('id'), options).pipe(
      map(returnedUser => {
        this.client = returnedUser
        this.reservation.client = this.client
      })).subscribe(  () => 
      {
        if(this.reservation.client.numOfPenalties > 3)
        {
          alert( 'You can not make reservations this month!')
        }
        else
        {
     
          this.http.post<any>(this.endpoint.CHECK_COTTAGE_RESERVATION, body, options).pipe(
            map(returnedData => {
                    this.checkRes = returnedData
           })).subscribe( () =>
              {
                if( this.checkRes == false)
                                  {
                                    alert( "Sorry, the boat is not free, please pick another date")
                                  }
                else
                                  {
                                            this.http.post<any>(this.endpoint.CREATE_RESERVATION, body, options).pipe(
                                              map(returnedData => {
                                                this.reservation = returnedData
                                              })).subscribe()
  
  
                                              alert("You created reservation seccessfuly!")
                                  }
               })

        }

      })




  }


  sortData(sort: Sort) 
  {
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
