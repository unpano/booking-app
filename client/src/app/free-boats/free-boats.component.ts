import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Boat } from '../dto/boat';
import { ReservationType } from '../dto/enums/ReservationType';
import { Reservation } from '../dto/reservation';
import { PricelistComponent } from '../pricelist/pricelist.component';
import { Endpoint } from '../util/endpoints-enum';
import { Global } from '../util/global';

@Component({
  selector: 'app-free-boats',
  templateUrl: './free-boats.component.html',
  styleUrls: ['./free-boats.component.css']
})
export class FreeBoatsComponent implements OnInit {

  endpoint = Endpoint
  boats: any

  reservation : Reservation = new Reservation()

  @Input() startDate : any
  @Input() endDate : any
  @Input() searchText : any

  constructor(private router: Router,private http: HttpClient, private dialog: MatDialog) { }

  ngOnInit(): void {

      let params = new HttpParams();

      params = params.append("startTime", this.startDate + "T11:00:00");
      params = params.append("endTime", this.endDate + "T11:00:00");

      const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
      let options = { headers: headers,
                      params :params };
      
      this.http.get<any>(this.endpoint.FREE_BOATS, options).pipe(
      map(returnedBoat => {
            this.boats = returnedBoat
      })).subscribe()

  }


  boatDetails(boat : Boat)
  {
    Global.boat = boat;
    this.router.navigate(["boat"]);
  }

  pricelist(boat : Boat)
  {
    sessionStorage.setItem('boatId', boat.id.toString())

    let dialogRef = this.dialog.open(PricelistComponent)
    dialogRef.afterClosed().subscribe();
  }



  reserve(boat : Boat)
  {

    this.reservation.startTime = this.startDate + "T11:00:00"
    this.reservation.endTime = this.endDate + "T11:00:00"
    this.reservation.reservationType = ReservationType.BOAT
    this.reservation.price = boat.price;

    alert(this.reservation.reservationType)

    


    const body=JSON.stringify(this.reservation); 
    const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  

    let options = { headers: headers,
                    body : body};

     
    this.http.post<any>(this.endpoint.CREATE_RESERVATION + boat.id.toString() + "/" + '1',  options).pipe(
      map(returnedRes=> {
      })).subscribe()

      alert("zavrseno!")
      alert(this.reservation.startTime)
  }


}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
