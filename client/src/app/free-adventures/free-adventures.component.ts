import { HttpClient, HttpParams } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Adventure } from '../dto/adventure';
import { Client } from '../dto/client';
import { ReservationType } from '../dto/enums/ReservationType';
import { Reservation } from '../dto/reservation';
import { PricelistComponent } from '../pricelist/pricelist.component';
import { Endpoint } from '../util/endpoints-enum';

@Component({
  selector: 'app-free-adventures',
  templateUrl: './free-adventures.component.html',
  styleUrls: ['./free-adventures.component.css']
})
export class FreeAdventuresComponent implements OnInit {

 
  endpoint = Endpoint
  adventures: any
  sortedData: any

  reservation : Reservation = new Reservation()

  client : Client= new Client()
  checkRes : any

  @Input() startDate : any
  @Input() endDate : any
  @Input() searchText : any
  @Input() numOfPersons : any

  constructor(private router: Router,private http: HttpClient, private dialog: MatDialog) { }

  ngOnInit(): void {

    this.reservation.numOfPersons = this.numOfPersons
      let params = new HttpParams();

      params = params.append("startTime", this.startDate + "T11:00:00");
      params = params.append("endTime", this.endDate + "T11:00:00");

      const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
      let options = { headers: headers,
                      params :params };
      
      this.http.get<any>(this.endpoint.FREE_ADVENTURES, options).pipe(
      map(returnedBoat => {
            this.adventures = returnedBoat
            this.sortedData = this.adventures.slice()
      })).subscribe()

      this.http.get<any>(this.endpoint.FIND_CLIENT+ sessionStorage.getItem('id'), options).pipe(
        map(returnedUser => {
          this.reservation.client = returnedUser
    })).subscribe( () => {})

  }


  adventureDetails(adventure : Adventure)
  {
    sessionStorage.setItem('entityId', adventure.id.toString())
    this.router.navigate(["adventure"]);
  }

  actions(adventure : Adventure)
  {
    sessionStorage.setItem('reservationType', 'ADVENTURE')
    sessionStorage.setItem('entityId', adventure.id.toString())
    
    this.router.navigate(["actions"]);
  }




  pricelist(adventure : Adventure)
  {    
    sessionStorage.setItem('reservationType', 'ADVENTURE')
    sessionStorage.setItem('entityId', adventure.id.toString())

    let dialogRef = this.dialog.open(PricelistComponent)
    dialogRef.afterClosed().subscribe();
  }


  reserve(adventure : Adventure)
  {
    sessionStorage.setItem('entityId', adventure.id.toString())

    this.reservation.adventure = adventure;
    this.reservation.numOfPersons = this.numOfPersons

    this.reservation.startTime = this.startDate + "T11:00:00"
    this.reservation.endTime = this.endDate + "T11:00:00"

    this.reservation.reservationType = ReservationType.ADVENTURE
    this.reservation.price = adventure.price;
  
    const headers = { 'content-type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  

    let options = { headers: headers };

    const body=JSON.stringify(this.reservation); 

    this.http.get<any>(this.endpoint.FIND_CLIENT+ sessionStorage.getItem('id'), options).pipe(
            map(returnedUser => {
              this.reservation.client = returnedUser
        })).subscribe( () => 
      {
        if(this.reservation.client.numOfPenalties > 3)
        {
          alert( 'You can not make reservations this month!')
        }
        else
        {
     
          this.http.post<any>(this.endpoint.CHECK_ADVENTURE_RESERVATION, body, options).pipe(
            map(returnedData => {
                    this.checkRes = returnedData
           })).subscribe( () =>
              {
                if( this.checkRes == false)
                                  {
                                    alert( "Sorry, the adventure is not free, please pick another date")
                                  }
                else
                                  {
                                            this.http.post<any>(this.endpoint.CREATE_RESERVATION, body, options).pipe(
                                              map(returnedData => {
                                                this.reservation = returnedData
                                              })).subscribe()
  
  
                                              alert("You created reservation seccessfuly!")
                                              sessionStorage.setItem('reservationId', this.reservation.id.toString())
                                          
                                              let dialogRef = this.dialog.open(PricelistComponent)
                                              dialogRef.afterClosed().subscribe();
                                  }
               })

        }

      })




  }



  sortData(sort: Sort) 
  {
    const data = this.adventures.slice();
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

