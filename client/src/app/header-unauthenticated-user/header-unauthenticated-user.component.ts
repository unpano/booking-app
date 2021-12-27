import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Global } from '../util/global';

@Component({
  selector: 'app-header-unauthenticated-user',
  templateUrl: './header-unauthenticated-user.component.html',
  styleUrls: ['./header-unauthenticated-user.component.css']
})
export class HeaderUnauthenticatedUserComponent implements OnInit {

  token = Global.token.access_token

  constructor(private router: Router){}

  ngOnInit(): void {
  }

  

  

}
