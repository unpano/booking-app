import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../dto/user';
import { VerifiedUsersService } from './service/verified-users.service';

@Component({
  selector: 'app-verified-users',
  templateUrl: './verified-users.component.html',
  styleUrls: ['./verified-users.component.css']
})
export class VerifiedUsersComponent implements OnInit {

  usersReg !: User[];
  constructor(private verifUserService: VerifiedUsersService,
    private router:Router) { }

  ngOnInit(): void {
    this.getRegUsers();
  }

  private getRegUsers(){
    const headers = { 'content-type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
      let options = { headers: headers };
    this.verifUserService.getRegUsers(options).subscribe(data=>{
      this.usersReg = Object.assign(data);
    })
  }

}
