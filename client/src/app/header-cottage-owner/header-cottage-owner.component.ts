import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-cottage-owner',
  templateUrl: './header-cottage-owner.component.html',
  styleUrls: ['./header-cottage-owner.component.css']
})
export class HeaderCottageOwnerComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logOut(){
    sessionStorage.clear()
    this.router.navigate([''])
    
  }

}
