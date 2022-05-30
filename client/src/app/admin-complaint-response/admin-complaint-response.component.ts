import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComplaintClient } from '../dto/ComplaintClient';
import { AdminComplaintResponseService } from './service/admin-complaint-response.service';

@Component({
  selector: 'app-admin-complaint-response',
  templateUrl: './admin-complaint-response.component.html',
  styleUrls: ['./admin-complaint-response.component.css']
})
export class AdminComplaintResponseComponent implements OnInit {

  clientId !:Number;
  instructorId !: Number;

  replyComplaint : ComplaintClient  = new ComplaintClient();
  constructor(private router:Router,
              private activeRoute:ActivatedRoute,
              private adminComplaintResponseService: AdminComplaintResponseService) { }

  ngOnInit(): void {
    this.clientId = this.activeRoute.snapshot.params['clientId'];
    console.log(this.clientId);

    this.instructorId = this.activeRoute.snapshot.params['instructorId'];
    console.log(this.instructorId);



  }

  cancel(){
    this.router.navigate(['all-revisions-marks-for-instructor']);
  }

  confirm(clientId:Number,instructorId:Number){
    const headers = { 'content-type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };


    this.replyComplaint.client_id = clientId;
    this.replyComplaint.instructor_id = instructorId;

    console.log(this.replyComplaint);
    if(this.replyComplaint.response_admin){
      this.adminComplaintResponseService.replyToComplaintAdmin(this.replyComplaint,options).subscribe();
      alert("You commented to this complaint!");
      this.router.navigate(['all-revisions-marks-for-instructor']);
    } else {
      alert("You need to insert comment!");
    }

  }

}
