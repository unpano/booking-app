import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ComplaintClient } from '../dto/ComplaintClient';
import { ClientViewComplaintService } from './service/client-view-complaint.service';

@Component({
  selector: 'app-client-view-complaint-for-instructor',
  templateUrl: './client-view-complaint-for-instructor.component.html',
  styleUrls: ['./client-view-complaint-for-instructor.component.css']
})
export class ClientViewComplaintForInstructorComponent implements OnInit {

  clientId !: Number;
  instructorId !: Number;

  complaint : ComplaintClient = new ComplaintClient();
  constructor(private router:Router,
              private activeRoute:ActivatedRoute,
              private clientViewComplaintService: ClientViewComplaintService) { }

  ngOnInit(): void {
    const headers = { 'content-type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };


    this.clientId = this.activeRoute.snapshot.params['clientId'];
    console.log(this.clientId);

    this.instructorId = this.activeRoute.snapshot.params['instructorId'];
    console.log(this.instructorId);

    this.clientViewComplaintService.getComplaintFromClient(this.clientId,this.instructorId,options).subscribe(data=>{
        this.complaint = Object.assign(data);
        console.log(this.complaint);
    })
  
  
  }

  backToReservations(){
    this.router.navigate(['clientReservations']);

  }

}
