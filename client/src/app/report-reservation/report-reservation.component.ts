import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Report } from '../dto/report';
import { Endpoint } from '../util/endpoints-enum';

@Component({
  selector: 'app-report-reservation',
  templateUrl: './report-reservation.component.html',
  styleUrls: ['./report-reservation.component.css']
})
export class ReportReservationComponent implements OnInit {

  endpoint = Endpoint;
  comment !: String
  badComment !: Boolean
  didNotShow !: Boolean

  report : Report = new Report()

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
  }

  badCommentFunc(event: any){
    if ( event.target.checked ) {
      this.badComment = true;
 }
  }

  didNotShowFunc(event: any){
    if ( event.target.checked ) {
      this.didNotShow = true
 }
  }

  onSubmit() {

    this.report.reservationId = sessionStorage.getItem("reservationId")
    this.report.comment = this.comment

    if(this.didNotShow){
      //cottage owner punishes client
      this.report.approved = true
      this.report.punishClient = true
    } else if (!this.didNotShow && this.badComment ){
      //admin punishes client
      this.report.approved = false
      this.report.punishClient = true
    }else if (!this.didNotShow && !this.badComment){
      //do not punish client
      this.report.approved = true
      this.report.punishClient = false
    }      

    const headers = { 'content-type': 'application/json',
                      'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };

    let body = JSON.stringify(this.report)

    this.http.post<any>(this.endpoint.REPORTS,body, options).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
          alert("Bad request, please try again later.");
        } else {
          alert("User with username " + sessionStorage.getItem('email') + ' has already reported client visit.');
        }
        return EMPTY;
      })).subscribe(() =>{
        alert("Successfully reported client visit.")
        this.router.navigate(["cottage/past-reservations"])
      } )
  }

  cancel(){
      this.router.navigate(["past-reservations"])
  }

}
