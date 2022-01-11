import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DateFilterFn } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Cottage } from '../dto/cottage';
import { ReservationType } from '../dto/enums/ReservationType';
import { MailDTO } from '../dto/mailDTO';
import { Reservation } from '../dto/reservation';
import { DateFilterService } from '../util/dateFIlterService';
import { Endpoint } from '../util/endpoints-enum';
import { Global } from '../util/global';

@Component({
  selector: 'app-new-reservation',
  templateUrl: './new-reservation.component.html',
  styleUrls: ['./new-reservation.component.css']
})
export class NewReservationComponent implements OnInit {

  username !: String
  username1 !: String
  pickPeriod !: FormGroup;
  endpoint = Endpoint

  minDate = new Date

  cottage : any

  reservation : Reservation = new Reservation()
  reservationType !: ReservationType 

  actions : any

  reservedCottageName !: String

  

  constructor(private router: Router, private http: HttpClient, private dateService: DateFilterService) { 
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    this.pickPeriod = new FormGroup({
      start: new FormControl(new Date(year, month, 11)),
      end: new FormControl(new Date(year, month, 15)),
    });

  }

  ngOnInit(): void {
    //find all actions for cottage
    const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };

    this.http
        .get(this.endpoint.RESERVATIONS + sessionStorage.getItem('cottageId'),options)
          .pipe(
            map(returnedActions => {
              this.actions = returnedActions
            })).subscribe(() =>{})
  }

  rangeFilter: DateFilterFn<Date> = (date: Date | null) => {
  
    if (date != null) return this.isFree(date);
    return true
  };

  isFree(input: Date): boolean{
    let dateIsFree : boolean = true

    input.setDate(input.getDate() +1)
    
    let date1 = new Date(input).toISOString()
    date1.toLocaleString();
    date1 = date1.substring(0,date1.indexOf("T"))

    Global.forbiddenDates.forEach((date: Date)=> {

      if(date1 == date.toString()){
      
        dateIsFree = false
      }
    });
     return dateIsFree
    
  }

  reserve(){

    if(sessionStorage.getItem('role') == 'ROLE_COTTAGE_OWNER'){
      this.reservation.reservationType = ReservationType.COTTAGE
    }
    this.reservation.startTime = this.pickPeriod.value["start"]
    this.reservation.endTime = this.pickPeriod.value["end"]

    const headers = { 'content-type': 'application/json',
                      'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };
    
    const body=JSON.stringify(this.reservation);
    console.log(body)
    
  //create new reservation
    this.http.post<any>(this.endpoint.RESERVATIONS + this.username +
                                                      "/" + sessionStorage.getItem("cottageId") + "/" + false, body, options).pipe(
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
    ).subscribe(() => this.sendMail(this.username))
    
  }

  reserveAction(id: Number){
    const headers = { 'content-type': 'application/json',
                      'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };
    
    this.http.put<any>(this.endpoint.RESERVATIONS + id +
                                                      "/" + this.username1,null, options).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
          alert("Bad request, please try again later.");
        } else {
          alert("Action does not exist.");
        }

        return EMPTY;
      })
    ).subscribe(() => this.sendMail(this.username1))
  }

  sendMail(username: String){
    let mail = new MailDTO()

    mail.mailFrom = "isaBooking56@gmail.com"
    //OVDE MI TREBALO PODESITI DA MEJL BUDE USERNAME KORISNIKA KOJI ZAKAZUJE
    //mail.mailTo = username
    mail.mailTo = "isaBooking56@gmail.com"
    mail.mailSubject = "-CONFIRMATION MAIL-"
    mail.mailContent = "Successfully booked cottage " + this.reservedCottageName + ". Period: " + this.reservation.startTime + 
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

}
