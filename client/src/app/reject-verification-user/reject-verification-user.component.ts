import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminResponse } from '../dto/AdminResponse';
import { User } from '../dto/user';
import { RejectVerificationUserService } from './service/reject-verification-user.service';

@Component({
  selector: 'app-reject-verification-user',
  templateUrl: './reject-verification-user.component.html',
  styleUrls: ['./reject-verification-user.component.css']
})
export class RejectVerificationUserComponent implements OnInit {

  userId !: Number; 
  userInfo : User = new User();

  adminResponse : AdminResponse = new AdminResponse();
  constructor(private router:Router,
              private activeRoute:ActivatedRoute,
              private rejectVerificationService:RejectVerificationUserService) { }

  ngOnInit(): void {
    const headers = { 'content-type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };

    this.userId = this.activeRoute.snapshot.params['userId'];
    console.log(this.userId);

    this.rejectVerificationService.getUserInfo(this.userId,options).subscribe(user=>{
      this.userInfo = Object.assign(user);
      console.log(this.userInfo); 
    })
  }

  cancel(){
    this.router.navigate(['unverified-users']);
  }

  confirm(){
    const headers = { 'content-type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };

    if(this.adminResponse.comment){
      this.adminResponse.toEmail = this.userInfo.email;
      console.log(this.adminResponse);
      this.rejectVerificationService.rejectVerification(this.userInfo.email,this.userInfo,options).subscribe();
      this.rejectVerificationService.sendRejectingEmail(this.adminResponse,options).subscribe();
      alert("You rejected verify user "+ this.userInfo.firstName + " "+ this.userInfo.lastName +"\n He/she will receive admin comment on "+ this.userInfo.email);
      this.router.navigate(['unverified-users']);
    }else {
      alert("Comment cannot be empty.");
    }

  }

}
