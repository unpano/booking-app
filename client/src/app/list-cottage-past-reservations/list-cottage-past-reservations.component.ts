import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Reservation } from '../dto/reservation';
import { User } from '../dto/user';
import { ProfileClientComponent } from '../profile-client/profile-client.component';
import { Endpoint } from '../util/endpoints-enum';

@Component({
  selector: 'app-list-cottage-past-reservations',
  templateUrl: './list-cottage-past-reservations.component.html',
  styleUrls: ['./list-cottage-past-reservations.component.css']
})
export class ListCottagePastReservationsComponent implements OnInit {

  reservations: any

  sortedData: any
  searchText: any
  endpoint = Endpoint;

  constructor(private http: HttpClient,private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {

    //list of cottage reservations
    const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };

    this.http
        .get(this.endpoint.RESERVATIONS + sessionStorage.getItem('cottageId') + '/past-reservations',options)
          .pipe(
            map(returnedReservations=> {
              this.reservations = returnedReservations
              this.sortedData = this.reservations.slice()
            })).subscribe(() =>{
              //check if reservation is already reported by cottage owner
              this.reservations.forEach((reservation: Reservation) => {
                this.http
                    .get(this.endpoint.RESERVATIONS + reservation.id + '/isReported',options)
                      .pipe(
                        map(isReported => {
                          if(isReported) reservation.reported = true; else reservation.reported = false
                        })).subscribe()
              });
              
            })
  }

  clientProfile(client: User){
    sessionStorage.setItem("clientUsername",client.email)
    let dialogRef = this.dialog.open(ProfileClientComponent,{
      autoFocus: false,
      maxHeight: '90vh' //you can adjust the value as per your view
    })
    dialogRef.afterClosed().subscribe();
  }

  report(id: Number){
    sessionStorage.setItem("reservationId",id.toString());
    this.router.navigate(["cottage/past-reservations/report"])
  }

  sortData(sort: Sort) {
    const data = this.reservations.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a : any, b : any) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'startTime': return compare(a.startTime, b.startTime, isAsc);
        case 'endTime': return compare(a.endTime, b.endTime, isAsc);
        case 'client': return compare(a.client.firstName, b.client.firstName, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


