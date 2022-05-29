import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { request } from 'http';
import { DeactivationRequest } from '../dto/DeactivationRequest';
import { User } from '../dto/user';
import { AdminRequestsDeletingService } from './service/admin-requests-deleting.service';

@Component({
  selector: 'app-admin-requests-deleting-account',
  templateUrl: './admin-requests-deleting-account.component.html',
  styleUrls: ['./admin-requests-deleting-account.component.css']
})
export class AdminRequestsDeletingAccountComponent implements OnInit {

  allRequests : DeactivationRequest[] = new Array();

  constructor(private router:Router,
              private adminRequestService: AdminRequestsDeletingService
              ) { }

  ngOnInit(): void {
      const headers = { 'content-type': 'application/json',
                      'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
      let options = { headers: headers };


      this.adminRequestService.getAllDeactivationRequests(options).subscribe(data=>{
        this.allRequests = Object.assign(data);
        console.log(this.allRequests);

        this.allRequests.forEach(request => {
            if(request.status!='APPROVED'){
            this.adminRequestService.getIfUserCanBeDeleted(request.emailUser,options).subscribe(response=>{
              request.canBeDeletedUser = Object.assign(response);
              console.log(request.canBeDeletedUser);
            
            })
          }

          })

          
        });
    

  }


  deleteUser(canBeDeletedUser:Boolean,userId:Number,role:String){
    const headers = { 'content-type': 'application/json',
                      'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
      let options = { headers: headers };
   
    console.log(userId);
    if(canBeDeletedUser==false){
      if(window.confirm("This user can only be disabled,have wired entities.\n Do you want to continue?")){
        
        window.close();
      } else{
        window.close();
      }
      
      
    } else{
      if(window.confirm("This user can be deleted.\n Do you want to continue?")){
       if(role=='ROLE_ADMIN'){
         this.adminRequestService.deleteAdmin(userId,options).subscribe();
         this.adminRequestService.approveRequestForDeletingAccount(userId,options).subscribe();
         console.log(role);
       } else if(role=='ROLE_INSTRUCTOR'){
        this.adminRequestService.approveRequestForDeletingAccount(userId,options).subscribe();
        console.log(role);

       } else if(role=='ROLE_COTTAGE_OWNER'){
        this.adminRequestService.approveRequestForDeletingAccount(userId,options).subscribe();
        console.log(role);

       } else if(role=='ROLE_BOAT_OWNER'){
        this.adminRequestService.approveRequestForDeletingAccount(userId,options).subscribe();
        console.log(role);

       } else if(role=='ROLE_CLIENT'){
        this.adminRequestService.approveRequestForDeletingAccount(userId,options).subscribe();
        console.log(role);

       }
       // window.setInterval('document.location.reload()', 1000);
      } else{
        window.close();
      }
    
    }
  }


  rejectDeleting(userId:Number){
    if(window.confirm("You want to reject deleting this user?")){
      const headers = { 'content-type': 'application/json',
                      'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
      let options = { headers: headers };

      this.adminRequestService.rejectDeletingUser(userId,options).subscribe();
      alert("You rejected deleting this user!");
      window.setInterval('document.location.reload()', 1000);
  } else {
    window.close();
  }

  } 

}
