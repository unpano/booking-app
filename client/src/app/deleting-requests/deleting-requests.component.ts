import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isEmpty } from 'rxjs/operators';
import { DeactivationRequest } from '../dto/DeactivationRequest';
import { User } from '../dto/user';
import { DeletingRequestsService } from './service/deleting-requests.service';

@Component({
  selector: 'app-deleting-requests',
  templateUrl: './deleting-requests.component.html',
  styleUrls: ['./deleting-requests.component.css']
})
export class DeletingRequestsComponent implements OnInit {


  requestSending : DeactivationRequest = new DeactivationRequest();
  userEmail !: String;
  userInfo : User = new User();
  constructor(private router:Router,
              private activeRoute:ActivatedRoute,
              private deletingRequestService:DeletingRequestsService) { }

  ngOnInit(): void {

    const headers = { 'content-type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
      let options = { headers: headers };

    this.userEmail = this.activeRoute.snapshot.params['userEmail'];
    console.log(this.userEmail);

    this.deletingRequestService.getUserInfo(this.userEmail,options).subscribe(data=>{
      this.userInfo = Object.assign(data);
      console.log(this.userInfo);

      this.deletingRequestService.getDeactivationRequest(this.userInfo.id,options).subscribe(data=>{
        this.requestSending = Object.assign(data);
        console.log(this.requestSending);
      })
    })
  }

  applyForDeleting(userId:Number){

    const headers = { 'content-type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
      let options = { headers: headers };
    
    this.requestSending.userId = userId;
    console.log(this.requestSending);
   // console.log(this.userInfo.userType);
    if(!this.requestSending.description){
      alert("Description cannot be empty!");
    } else{
      if(this.userInfo.userType=='ROLE_ADMIN'){
        this.deletingRequestService.sendDeactivationRequest(this.requestSending,options).subscribe();
        alert("You added request for deleting account!");
        this.router.navigate(['admin']);
      
      } else if(this.userInfo.userType=='ROLE_BOAT_OWNER'){
        this.deletingRequestService.sendDeactivationRequest(this.requestSending,options).subscribe();
        alert("You added request for deleting account!");
        this.router.navigate(['boatOwner']);

      } else if(this.userInfo.userType=='ROLE_COTTAGE_OWNER'){
        this.deletingRequestService.sendDeactivationRequest(this.requestSending,options).subscribe();
        alert("You added request for deleting account!");
        this.router.navigate(['cottages']);
      
      } else if(this.userInfo.userType=='ROLE_CLIENT'){
        this.deletingRequestService.sendDeactivationRequest(this.requestSending,options).subscribe();
        alert("You added request for deleting account!");
        this.router.navigate(['client']);
      
      } else if(this.userInfo.userType=='ROLE_INSTRUCTOR'){
        this.deletingRequestService.sendDeactivationRequest(this.requestSending,options).subscribe();
        alert("You added request for deleting account!");
        this.router.navigate(['instructor']);
      }

    }
  }
}
