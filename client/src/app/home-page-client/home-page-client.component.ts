import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Endpoint } from '../util/endpoints-enum';

@Component({
  selector: 'app-home-page-client',
  templateUrl: './home-page-client.component.html',
  styleUrls: ['./home-page-client.component.css']
})
export class HomePageClientComponent implements OnInit {

  types = [ 'Boat','Adventure', 'Cottage']
  type !: String

  dateInput : any
  endDateInput : any

  startTimeInput : any
  endTimeInput : any

  endpoint = Endpoint

  searchInput : any

  boats : any

  buttonClicked = Boolean(false)


  constructor(private router: Router,private http: HttpClient) { }

  ngOnInit(): void {

    this.buttonClicked = false
   
  }

  find()
  {
    this.buttonClicked = true
  }
  onSelectType(type : String)
  {
    this.type = type;
  }

}
