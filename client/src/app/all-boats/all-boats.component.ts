import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Boat } from '../dto/boat';
import { Reservation } from '../dto/reservation';
import { HomePageClientComponent } from '../home-page-client/home-page-client.component';
import { Endpoint } from '../util/endpoints-enum';
import { Global } from '../util/global';

@Component({
  selector: 'app-all-boats',
  templateUrl: './all-boats.component.html',
  styleUrls: ['./all-boats.component.css']
})
export class AllBoatsComponent implements OnInit {

  endpoint = Endpoint
  searchText : any
  boats: any
  @Input() clickedValue : any;

  reservation : Reservation = new Reservation();


  constructor(private router: Router,private http: HttpClient) { }

  ngOnInit(): void 
  {

    const body=JSON.stringify(this.reservation); 

    const headers = { 'content-type': 'application/json'} 
    let options = { headers: headers };

        this.http.get<any>(this.endpoint.ALL_BOATS, options).pipe(
        map(returnedBoat => {
          this.boats = returnedBoat
        })).subscribe()
  }
  

  viewDetails(boat : Boat)
  {
    Global.clickedBoat = boat;
    this.router.navigate(["boat"]);
  }

}
