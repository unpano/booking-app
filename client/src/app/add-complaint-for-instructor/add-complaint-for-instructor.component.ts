import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComplaintClient } from '../dto/ComplaintClient';
import { AddComplaintService } from './service/add-complaint.service';

@Component({
  selector: 'app-add-complaint-for-instructor',
  templateUrl: './add-complaint-for-instructor.component.html',
  styleUrls: ['./add-complaint-for-instructor.component.css']
})
export class AddComplaintForInstructorComponent implements OnInit {

  clientId !: Number;
  instructorId !: Number;

  complaint : ComplaintClient = new ComplaintClient();

  constructor(private router:Router,
              private activeRoute:ActivatedRoute,
              private addComplaintService:AddComplaintService) { }

  ngOnInit(): void {
    this.clientId = this.activeRoute.snapshot.params['clientId'];
    console.log(this.clientId);
    this.instructorId = this.activeRoute.snapshot.params['instructorId'];
    console.log(this.instructorId);
  }

  cancel(){
    this.router.navigate(['clientReservations']);
  }

  submitAndSaveComplaint(clientId:Number,instructorId:Number){
    const headers = { 'content-type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };

    this.complaint.client_id = clientId;
    this.complaint.instructor_id = instructorId;

    console.log(this.complaint);

    this.addComplaintService.saveComplaint(this.complaint,options).subscribe();
    this.router.navigate(['clientReservations']);


  }
}
