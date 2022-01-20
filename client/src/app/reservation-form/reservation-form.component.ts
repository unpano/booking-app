import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ReservationType } from '../dto/enums/ReservationType';
import { Reservation } from '../dto/reservation';
import { Endpoint } from '../util/endpoints-enum';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {



  endpoint = Endpoint
  reservation : Reservation = new Reservation()
  startTime : any
  endTime : any
  numOfPersons : any

  checkRes : any

  constructor(private router: Router,private http: HttpClient, private dialog: MatDialog) { }


  ngOnInit(): void {

  }

  create()
  {
    console.log(this.reservation)
    
    this.reservation.reservationType = ReservationType.BOAT
    this.reservation.startTime = this.startTime + "T11:00:00"
    this.reservation.endTime = this.endTime + "T11:00:00"
    this.reservation.numOfPersons = this.numOfPersons

    const headers = { 'content-type': 'application/json'} 
    let options = { headers: headers };

    if( this.startTime == undefined || this.endTime == undefined)
    {
      alert("Fill all the fields, please!")
    }
    else
    {

              this.http.get<any>(this.endpoint.FIND_CLIENT+ sessionStorage.getItem('id'), options).pipe(
                map(returnedUser => {
                  this.reservation.client = returnedUser
                })).subscribe(  () => 
                {
        
                  this.http.get<any>(this.endpoint.FIND_BOAT + "/"+ sessionStorage.getItem('entityId'), options).pipe(
                    map(returnedBoat => {
                      this.reservation.boat = returnedBoat
                    })).subscribe( () => 
                      {
                          this.reservation.price = this.reservation.boat.price
                          const body = JSON.stringify(this.reservation);  

                          
                          this.http.post<any>(this.endpoint.CHECK_BOAT_RESERVATION, body, options).pipe(
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
                              }
                              )
            
                       
        
                      })
                  
                } )
      
      }
  }

}
