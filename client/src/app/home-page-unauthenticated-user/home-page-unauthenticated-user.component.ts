import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page-unauthenticated-user',
  templateUrl: './home-page-unauthenticated-user.component.html',
  styleUrls: ['./home-page-unauthenticated-user.component.css']
})
export class HomePageUnauthenticatedUserComponent implements OnInit {

  types = [ 'Boat','Instructor', 'Cottage']
  type !: String
  dateInput : any
  timeInput : any

  constructor(private router: Router) { }

  ngOnInit(): void {
    
    if(sessionStorage.getItem('token') != null){
      
      if(sessionStorage.getItem('role') == 'ROLE_CLIENT'){
        this.router.navigate(['client'])
      }
      if(sessionStorage.getItem('role') == 'ROLE_ADMIN'){
        this.router.navigate(['admin'])
      }
      if(sessionStorage.getItem('role') == 'ROLE_COTTAGE_OWNER'){
        this.router.navigate(['cottageOwner'])
      }
      if(sessionStorage.getItem('role') == 'ROLE_BOAT_OWNER'){
        this.router.navigate(['boatOwner'])
      }
      if(sessionStorage.getItem('role') == 'ROLE_INSTRUCTOR'){
        this.router.navigate(['instructor'])
      }
    }
  }

  onSelectType(type : String)
  {
    this.type = type;
  }

}
