import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DateFilterFn } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ReservationType } from '../dto/enums/ReservationType';
import { MailDTO } from '../dto/mailDTO';
import { Reservation } from '../dto/reservation';
import { Endpoint } from '../util/endpoints-enum';
import { Global } from '../util/global';

@Component({
  selector: 'app-new-action',
  templateUrl: './new-action.component.html',
  styleUrls: ['./new-action.component.css']
})
export class NewActionComponent implements OnInit {

  username !: String
  pickPeriod !: FormGroup;
  endpoint = Endpoint

  minDate = new Date

  reservation : Reservation = new Reservation()
  reservationType !: ReservationType 

  cottage : any
  reservedCottageName !: String

  boat : any
  reservedBoatName !: String

  subscribers : any

  price !: Number

  constructor(private router: Router, private http: HttpClient) { 
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    this.pickPeriod = new FormGroup({
      start: new FormControl(new Date(year, month, 28)),
      end: new FormControl(new Date(year, month, 29)),
    });
  }

  ngOnInit(): void {
  }

  createAction(){
    if(sessionStorage.getItem('role') == 'ROLE_COTTAGE_OWNER'){
      this.reservation.reservationType = ReservationType.COTTAGE
    }
    if(sessionStorage.getItem('role') == 'ROLE_BOAT_OWNER'){
      this.reservation.reservationType = ReservationType.BOAT
    }
    this.reservation.startTime = this.pickPeriod.value["start"]
    this.reservation.endTime = this.pickPeriod.value["end"]

    const headers = { 'content-type': 'application/json',
                      'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };
    
    const body=JSON.stringify(this.reservation);
    
  //create new action
  if (this.price != undefined){
  
    if(sessionStorage.getItem('role') == "ROLE_COTTAGE_OWNER"){
      this.http.post<any>(this.endpoint.RESERVATIONS + this.username +
        "/" + sessionStorage.getItem("cottageId") + "/" + true + '/' + this.price, body, options).pipe(
          catchError((error: HttpErrorResponse) => {
              if (error.error instanceof Error) {
                  alert("Bad request, please try again later.");
              } else {
              if(sessionStorage.getItem('cottageId') == undefined)
                  this.router.navigate(["login"])
              alert("Conficting period.");
          }

          return EMPTY;
          }),map(reservedCottage => {

          const headers = { 'content-type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
          let options = { headers: headers };
          
          this.http
          .get(this.endpoint.COTTAGES + sessionStorage.getItem('cottageId'),options)
          .pipe(
          map(returnedCottage => {
              this.cottage = returnedCottage
              this.reservedCottageName = this.cottage["name"]
          })).subscribe()
          })
          ).subscribe(() => {
          //Mejl se salje pretpacenicima
          //for petlja
          //proci kroz listu username-ove koji su pretplaceni na vikendicu
          //poslati mejl
          const headers = { 'content-type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
          let options = { headers: headers };

          this.http
          .get(this.endpoint.COTTAGES + sessionStorage.getItem('cottageId') + '/subscribers',options)
          .pipe(
          map(returnedSubscribers => {
              this.subscribers = returnedSubscribers

              this.subscribers.forEach((subscriber:any) => {
              this.sendMail(subscriber["email"])
          });
          })).subscribe(()=>{
              alert("Successfully created new action.")
              this.router.navigate(["cottage/reserve"])
              })
          })  
          }
          if(sessionStorage.getItem('role') == "ROLE_BOAT_OWNER"){
            this.http.post<any>(this.endpoint.RESERVATIONS + this.username +
              "/" + sessionStorage.getItem("boatId") + "/" + true + '/' + this.price, body, options).pipe(
                catchError((error: HttpErrorResponse) => {
                    if (error.error instanceof Error) {
                        alert("Bad request, please try again later.");
                    } else {
                    if(sessionStorage.getItem('boatId') == undefined)
                        this.router.navigate(["login"])
                    alert("Conficting period.");
                }
      
                return EMPTY;
                }),map(reservedBoat => {
      
                const headers = { 'content-type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
                let options = { headers: headers };
                
                this.http
                .get(this.endpoint.BOATS + sessionStorage.getItem('boatId'),options)
                .pipe(
                map(returnedBoat => {
                    this.boat = returnedBoat
                    this.reservedBoatName = this.boat["name"]
                })).subscribe()
                })
                ).subscribe(() => {
                //Mejl se salje pretpacenicima
                //for petlja
                //proci kroz listu username-ove koji su pretplaceni na vikendicu
                //poslati mejl
                const headers = { 'content-type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
                let options = { headers: headers };
      
                this.http
                .get(this.endpoint.BOATS + sessionStorage.getItem('boatId') + '/subscribers',options)
                .pipe(
                map(returnedSubscribers => {
                    this.subscribers = returnedSubscribers
      
                    this.subscribers.forEach((subscriber:any) => {
                    this.sendMail(subscriber["email"])
                });
                })).subscribe(()=>{
                    alert("Successfully created new action.")
                    this.router.navigate(["boat/reserve"])
                    })
                })  
          }
          
          
              }else alert("You did not fill in the action price.")
  }

  sendMail(username: String){
    let mail = new MailDTO()

    mail.mailFrom = "isaBooking56@gmail.com"
    mail.mailTo = username
    mail.mailSubject = "-CONFIRMATION MAIL-"
    mail.mailContent = "Successfully booked " + this.findName() + ". Period: " + this.reservation.startTime + 
    "-" + this.reservation.endTime + ". Kind requards, Isa Team 56."

    const headers = { 'content-type': 'application/json',
                      'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };

    let body = JSON.stringify(mail)
    
    this.http.post<any>(this.endpoint.MAIL + "send-mail",body, options).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
          alert("Bad request, please try again later.");
        } else {
          alert("Action does not exist.");
        }

        return EMPTY;
      })
    ).subscribe()
  }

  findName(){
    if(this.reservedBoatName != undefined)
    return "boat " + this.reservedBoatName
    else
    return "cottage " + this.reservedCottageName
  }
  rangeFilter: DateFilterFn<Date> = (date: Date | null) => {
  
    if (date != null) return this.isFree(date);
    return true
  };

  isFree(date: Date){
    if(sessionStorage.getItem('role') == "ROLE_COTTAGE_OWNER"){
      return this.isFreeCottage(date)
    }else
      return this.isFreeBoat(date)
  }

  isFreeBoat(input: Date){
    let dateIsFree : boolean = true

    input.setDate(input.getDate() +1)

    let date1 = new Date(input).toISOString()
    date1.toLocaleString();
    date1 = date1.substring(0,date1.indexOf("T"))

    Global.forbiddenDatesBoat.forEach((date: Date)=> {

      if(date1 == date.toString()){
      
        dateIsFree = false
      }
    });
     return dateIsFree
  }

  isFreeCottage(input: Date): boolean{
    let dateIsFree : boolean = true

    input.setDate(input.getDate() +1)

    let date1 = new Date(input).toISOString()
    date1.toLocaleString();
    date1 = date1.substring(0,date1.indexOf("T"))

    Global.forbiddenDatesCottage.forEach((date: Date)=> {

      if(date1 == date.toString()){
      
        dateIsFree = false
      }
    });
     return dateIsFree
    
  }
}
