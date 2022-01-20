import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Action} from '../dto/action';
import { map } from 'rxjs/operators';
import { Reservation } from '../dto/reservation';
import { Endpoint } from '../util/endpoints-enum';
import { MailDTO } from '../dto/mailDTO';

@Component({
  selector: 'app-all-actions',
  templateUrl: './all-actions.component.html',
  styleUrls: ['./all-actions.component.css']
})
export class AllActionsComponent implements OnInit {

  actions : any
  endpoint = Endpoint



  reservation : Reservation = new Reservation()

  constructor(private router: Router,private http: HttpClient, private dialog: MatDialog) { }

  ngOnInit(): void {


    const headers = { 'content-type': 'application/json'} 
    let options = { headers: headers };

    this.http.get<any>(this.endpoint.ACTIONS + sessionStorage.getItem('entityId'), options).pipe(
      map(returnedData => {
        this.actions = returnedData
      })).subscribe()
  }

  reserve(action : Action)
  {
    let mail = new MailDTO()
    mail.mailFrom = "isaBooking56@gmail.com"

    this.reservation.startTime = action.startDate
    this.reservation.endTime = action.endDate
    this.reservation.boat = action.boat
    this.reservation.numOfPersons = action.maxNumOfPersons

    const headers = { 'content-type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  

      let options = { headers: headers };

      this.http.get<any>(this.endpoint.FIND_CLIENT+ sessionStorage.getItem('id'), options).pipe(
          map(returnedUser => {
            this.reservation.client = returnedUser
      })).subscribe( () => 
      {
          this.http.get<any>(this.endpoint.FIND_BOAT + "/"+ sessionStorage.getItem('entityId'), options).pipe(
            map(returnedBoat => {
              this.reservation.boat = returnedBoat
            })).subscribe( () => 
              {
                mail.mailTo = this.reservation.client.email
                mail.mailSubject = "-CONFIRMATION MAIL-"
                mail.mailContent = "You successfully created reservation for boat" + this.reservation.boat.name + ". Period: from: " + this.reservation.startTime + 
                " to: " + this.reservation.endTime + ". Kind requards, Isa Team 56."

                  this.reservation.price = this.reservation.boat.price

  
                  const body = JSON.stringify(this.reservation);  

                  

                        this.http.post<any>(this.endpoint.CREATE_RESERVATION, body, options).pipe(
                            map(returnedData => {
                                  this.reservation = returnedData
                            })).subscribe( () =>
                            {

                              this.http.get<any>(this.endpoint.DELETE_ACTION + action.id).pipe(
                                map(returnedData => {
                        
                                })).subscribe( () =>
                                {
                                  this.http.get<any>(this.endpoint.ACTIONS + sessionStorage.getItem('entityId'), options).pipe(
                                    map(returnedData => {
                                      this.actions = returnedData
                                    })).subscribe()
                                })



                                const headers = { 'content-type': 'application/json',
                                'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
                              
                                let options = { headers: headers };
                                let body = JSON.stringify(mail)
                                this.http.post<any>(this.endpoint.MAIL + "send-mail",body, options).pipe().subscribe()
                            })


                  alert("You created reservation seccessfuly!")

    
              

            })
        
      })



    


  }

}

