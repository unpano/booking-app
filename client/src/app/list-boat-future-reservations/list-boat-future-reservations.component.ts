import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { User } from '../dto/user';
import { ProfileClientComponent } from '../profile-client/profile-client.component';
import { Endpoint } from '../util/endpoints-enum';

@Component({
  selector: 'app-list-boat-future-reservations',
  templateUrl: './list-boat-future-reservations.component.html',
  styleUrls: ['./list-boat-future-reservations.component.css']
})
export class ListBoatFutureReservationsComponent implements OnInit {

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
        .get(this.endpoint.RESERVATIONS + sessionStorage.getItem('boatId') + '/boat-future-reservations',options)
          .pipe(
            map(returnedReservations=> {
              this.reservations = returnedReservations
              //console.log(this.reservations)
              this.sortedData = this.reservations.slice()
            })).subscribe()
  }

  clientProfile(client: User){
    sessionStorage.setItem("clientUsername",client.email)
    let dialogRef = this.dialog.open(ProfileClientComponent,{
      autoFocus: false,
      maxHeight: '90vh' //you can adjust the value as per your view
    })
    dialogRef.afterClosed().subscribe();
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


