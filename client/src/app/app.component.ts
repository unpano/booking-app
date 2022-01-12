import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  whoIsLogged(): String{
    if(sessionStorage.getItem('role') == 'ROLE_CLIENT'){
      return 'client'
    }
    if(sessionStorage.getItem('role') == 'ROLE_ADMIN'){
      return 'admin'
    }
    if(sessionStorage.getItem('role') == 'ROLE_COTTAGE_OWNER'){
      return 'cottageOwner'
    }
    if(sessionStorage.getItem('role') == 'ROLE_BOAT_OWNER'){
      return 'boatOwner'
    }
    if(sessionStorage.getItem('role') == 'ROLE_INSTRUCTOR'){
      return 'instructor'
    }

    return 'nobody'
  }
}
