import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Global } from './util/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router){}

  whichHomePageToShow(){
    if (Global.token.role == "ROLE_COTTAGE_OWNER"){
      this.router.navigate(['cottageOwner'])
    }
    if (Global.token.role == "ROLE_BOAT_OWNER"){
      this.router.navigate(['boatOwner'])
    }
    if (Global.token.role == "ROLE_INSTRUCTOR"){
      this.router.navigate(["instructor"])
    }
    if (Global.token.role == "ROLE_CLIENT"){
      this.router.navigate(["client"])
    }
    if (Global.token.role == "ROLE_ADMIN"){
      this.router.navigate(["admin"])
    }
  }
}
