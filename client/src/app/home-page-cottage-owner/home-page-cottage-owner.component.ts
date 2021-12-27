import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page-cottage-owner',
  templateUrl: './home-page-cottage-owner.component.html',
  styleUrls: ['./home-page-cottage-owner.component.css']
})
export class HomePageCottageOwnerComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('token') == null){
      this.router.navigate([''])
    }
  }

}
