import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Global } from '../util/global';

@Component({
  selector: 'app-header-unauthenticated-user',
  templateUrl: './header-unauthenticated-user.component.html',
  styleUrls: ['./header-unauthenticated-user.component.css']
})
export class HeaderUnauthenticatedUserComponent implements OnInit {

  types = [ 'Boat','Instructor', 'Cottage']
  type !: String
  dateInput : any
  timeInput : any
  
  constructor(private router: Router){}

  ngOnInit(): void {
  }

  onSelectType(type : String)
  {
    this.type = type;
  }

  

  

}
