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

  types = [ 'Boat','Instructor', 'Cottage']
  type !: String
  dateInput : any
  timeInput : any
  endpoint = Endpoint
  boats : any
  buttonClicked = new Boolean(false);


  constructor(private router: Router,private http: HttpClient) { }

  ngOnInit(): void {
   
  }

  onSelectType(type : String)
  {
    this.type = type;
  }

  findEntities()
  {
    this.buttonClicked = true
  }
}
