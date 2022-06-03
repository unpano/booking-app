import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AdminResponse } from '../dto/AdminResponse';
import { ComplaintClient } from '../dto/ComplaintClient';
import { User } from '../dto/user';
import { AdminComplaintResponseService } from './service/admin-complaint-response.service';

@Component({
  selector: 'app-admin-complaint-response',
  templateUrl: './admin-complaint-response.component.html',
  styleUrls: ['./admin-complaint-response.component.css']
})
export class AdminComplaintResponseComponent implements OnInit {

  clientId !:Number;
  instructorId !: Number;

  clientInfo : User = new User();
  instructorInfo : User = new User();

  replyComplaint : ComplaintClient  = new ComplaintClient();

  adminResponseForClient : AdminResponse = new AdminResponse();
  adminResponseForInstructor : AdminResponse = new AdminResponse();

  constructor(private router:Router,
              private activeRoute:ActivatedRoute,
              private adminComplaintResponseService: AdminComplaintResponseService) { }

  ngOnInit(): void {
    const headers = { 'content-type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };

    this.clientId = this.activeRoute.snapshot.params['clientId'];
    console.log(this.clientId);

    this.instructorId = this.activeRoute.snapshot.params['instructorId'];
    console.log(this.instructorId);

    this.adminComplaintResponseService.getClientInfo(this.clientId,options).subscribe(client=>{
      this.clientInfo = Object.assign(client);
      console.log(this.clientInfo);
    })

    this.adminComplaintResponseService.getClientInfo(this.instructorId,options).subscribe(instructor=>{
      this.instructorInfo = Object.assign(instructor);
      console.log(this.instructorInfo);
    })

  }

  cancel(){
    this.router.navigate(['all-revisions-marks-for-instructor']);
  }

  confirm(clientId:Number,instructorId:Number,clientInfo:User,instructorInfo:User){
    const headers = { 'content-type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };


    this.replyComplaint.client_id = clientId;
    this.replyComplaint.instructor_id = instructorId;

    console.log(this.replyComplaint);
    if(this.replyComplaint.response_admin){
      this.adminResponseForClient.toEmail = clientInfo.email;
      this.adminResponseForClient.comment = this.replyComplaint.response_admin;

      this.adminResponseForInstructor.toEmail = instructorInfo.email;
      this.adminResponseForInstructor.comment = this.replyComplaint.response_admin;
      
      this.adminComplaintResponseService.checkIfComplaintHasAdminResponse(clientId,instructorId,options).subscribe(response=>{
        let response2 = Object.assign(response);
        console.log(response2);
        if(response2==false){
          alert("You added response to this complaint!");
        } else {
          alert("Sorry,other admin suddenly added comment on this complaint.");
        }
      
     
      this.adminComplaintResponseService.replyToComplaintAdmin(this.replyComplaint,options).subscribe(response=>{
        

        this.adminComplaintResponseService.sendMailResponseAdminComplaint(this.adminResponseForClient,options).subscribe();
        this.adminComplaintResponseService.sendMailResponseAdminComplaint(this.adminResponseForInstructor,options).subscribe();
      });
      
     
      this.router.navigate(['all-revisions-marks-for-instructor']);
    });

    } else {
      alert("You need to insert comment!");
    }

  }

}
