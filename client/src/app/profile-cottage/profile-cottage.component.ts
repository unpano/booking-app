import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Global } from '../util/global';

@Component({
  selector: 'app-profile-cottage',
  templateUrl: './profile-cottage.component.html',
  styleUrls: ['./profile-cottage.component.css']
})
export class ProfileCottageComponent implements OnInit {

  cottage = Global.cottage

  constructor(private router: Router) { }

  ngOnInit(): void {
    //if token expired
    if(sessionStorage.getItem('token') == null){
      this.router.navigate([''])
    }
  }

  bookCottage(){
    
  }
  removeCottage(){
    
  }
  futureReservations(){

  }
  pastReservations(){
    
  }
}
