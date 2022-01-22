import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page-unauthenticated-user',
  templateUrl: './home-page-unauthenticated-user.component.html',
  styleUrls: ['./home-page-unauthenticated-user.component.css']
})
export class HomePageUnauthenticatedUserComponent implements OnInit {

  types = [ 'Boat','Adventure', 'Cottage']
  type !: String
  dateInput : any
  timeInput : any
  searchInput : any

  constructor(private router: Router) { }

  ngOnInit(): void {
    
  }


  onSelectType(type : String)
  {
    this.type = type;
  }

}
