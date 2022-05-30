import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { runInThisContext } from 'vm';
import { Client } from '../dto/Client';
import { ComplaintClient } from '../dto/ComplaintClient';
import { MarkRevisionClient } from '../dto/MarkRevisionClient';
import { AllRevisionsMarksService } from './service/all-revisions-marks.service';

@Component({
  selector: 'app-all-revisions-marks-for-instructors',
  templateUrl: './all-revisions-marks-for-instructors.component.html',
  styleUrls: ['./all-revisions-marks-for-instructors.component.css']
})
export class AllRevisionsMarksForInstructorsComponent implements OnInit {

  notApprovedRevisions : MarkRevisionClient[] = new Array();
  approvedRevisions : MarkRevisionClient[] = new Array();
  allComplaints : ComplaintClient[] = new Array();
  constructor(private allRevisionsService:AllRevisionsMarksService,
              private router:Router) { }

  ngOnInit(): void {
    const headers = { 'content-type': 'application/json',
                      'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };

    this.allRevisionsService.getAllNotApprovedRevisions(options).subscribe(data=>{
      this.notApprovedRevisions = Object.assign(data);

      this.notApprovedRevisions.forEach(notApprovedRevision => {
          this.allRevisionsService.getOneClient(notApprovedRevision.clientId,options).subscribe(data=>{
            notApprovedRevision.client = Object.assign(data); 
          })

          this.allRevisionsService.getOneInstructor(notApprovedRevision.instructorId).subscribe(data=>{
            notApprovedRevision.instructor = data;
          })

      });

    })

    this.allRevisionsService.getAllApprovedRevisions(options).subscribe(data=>{
      this.approvedRevisions = Object.assign(data);

      this.approvedRevisions.forEach(approvedRevision => {
        this.allRevisionsService.getOneClient(approvedRevision.clientId,options).subscribe(data=>{
          approvedRevision.client = Object.assign(data);
        })

        this.allRevisionsService.getOneInstructor(approvedRevision.instructorId).subscribe(data=>{
          approvedRevision.instructor = data;
        })

      });



    })

    this.allRevisionsService.getAllComplaints(options).subscribe(data=>{
      this.allComplaints = Object.assign(data);

      this.allComplaints.forEach(complaint => {
        this.allRevisionsService.getOneClient(complaint.client_id,options).subscribe(client=>{
          complaint.userOtherInfo = Object.assign(client);
        })

        this.allRevisionsService.getOneInstructor(complaint.instructor_id).subscribe(instructor=>{
          complaint.instructorOtherInfo = Object.assign(instructor);
        })
      });
    })

  }




  approveRevision(notApprovedRevisionId:Number){
  
    if(window.confirm("You want to approve this revision?")){
      const headers = { 'content-type': 'application/json',
                      'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
      let options = { headers: headers };


      this.allRevisionsService.approveRevision(notApprovedRevisionId,options).subscribe();
      window.setInterval('document.location.reload()', 1000);
    } else {
      window.close();
    }


  }

  rejectRevision(notApprovedRevisionId:Number){
    if(window.confirm("You want to reject approving this revision?")){
      const headers = { 'content-type': 'application/json',
                      'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
      let options = { headers: headers };


      this.allRevisionsService.rejectRevision(notApprovedRevisionId,options).subscribe();
      window.setInterval('document.location.reload()', 1000);
    } else {
      window.close();
    }

  }

  replyComplaint(clientId:Number,instructorId:Number){
      this.router.navigate(['admin-complaint-response/clientId/' + clientId + '/instructorId/' + instructorId]);

  }




}
