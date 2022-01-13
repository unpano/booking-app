import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-boat-owner',
  templateUrl: './header-boat-owner.component.html',
  styleUrls: ['./header-boat-owner.component.css']
})
export class HeaderBoatOwnerComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logOut(){
    sessionStorage.clear()
    this.router.navigate([''])
    
  }


}
