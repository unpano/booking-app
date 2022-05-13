import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../dto/user';
import { UnverifUsersService } from './service/unverif-users.service';

@Component({
  selector: 'app-unverified-users',
  templateUrl: './unverified-users.component.html',
  styleUrls: ['./unverified-users.component.css']
})
export class UnverifiedUsersComponent implements OnInit {

  usersNonVerif !: User[];

  constructor(private unverifUsersService: UnverifUsersService,
    private router:Router) { }

  ngOnInit(): void {
    this.getNonVerifUsers();
  }

  private getNonVerifUsers(){
    const headers = { 'content-type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
      let options = { headers: headers };
    this.unverifUsersService.getNonVerifUsers(options).subscribe(data=>{
      this.usersNonVerif = Object.assign(data);
    })

  }

  verifyOne(email: String,user:User){
    this.sendEmail(email,user);
    const headers = { 'content-type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
      let options = { headers: headers };
    this.unverifUsersService.verifyOne(email,user,options).subscribe(data=>{
      alert("You verified user " + user.firstName + " " + user.lastName + " !" + "\n \n" +
        "He will receive notification for verification on its email: \n" + user.email);
        
        this.getNonVerifUsers();
    })

  }

  sendEmail(email: String,user:User){
    const headers = { 'content-type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
      let options = { headers: headers };
    this.unverifUsersService.sendVerificationEmail(email,user,options).subscribe(data=>{
      this.getNonVerifUsers();
    })
  }

}
