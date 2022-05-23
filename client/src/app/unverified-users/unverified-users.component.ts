import { unwrapResolvedMetadata } from '@angular/compiler';
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

  usersNonVerif : User[] = new Array();

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
    if(window.confirm("You want to verify this user?")){
    this.unverifUsersService.verifyOne(email,user,options).subscribe(data=>{
      alert("You verified user " + user.firstName + " " + user.lastName + " !" + "\n \n" +
        "He will receive notification for verification on its email: \n" + user.email);
        
        this.getNonVerifUsers();
        })
      } else{
        window.close();
      }
  }

  rejectVerification(email:String,user:User){
    
    const headers = { 'content-type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
      let options = { headers: headers };
      if(window.confirm("Are you sure you want to reject verification for this user?")){
          this.sendRejectingEmail(email,user);
          this.unverifUsersService.rejectVerification(email,user,options).subscribe(data=>{
            alert("You rejected verification for user " + user.firstName + " "+ user.lastName + " !" +
            "\n \n"+ "He will receive notification for rejecting on his email: \n"+user.email);
          
            this.getNonVerifUsers();
          })
      } else{
        window.close();
      }
  }

  sendEmail(email: String,user:User){
    const headers = { 'content-type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
      let options = { headers: headers };
    this.unverifUsersService.sendVerificationEmail(email,user,options).subscribe(data=>{
      this.getNonVerifUsers();
    })
  }

  sendRejectingEmail(email:String,user:User){
    const headers = { 'content-type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
      let options = { headers: headers };
    this.unverifUsersService.sendRejectingEmail(email,user,options).subscribe(data=>{
      this.getNonVerifUsers();
    })
  }

}
