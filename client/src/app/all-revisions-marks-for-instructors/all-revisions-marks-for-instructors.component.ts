import { Component, OnInit } from '@angular/core';
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
  constructor(private allRevisionsService:AllRevisionsMarksService) { }

  ngOnInit(): void {
    const headers = { 'content-type': 'application/json',
                      'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };

    this.allRevisionsService.getAllNotApprovedRevisions(options).subscribe(data=>{
      this.notApprovedRevisions = Object.assign(data);
    })

    this.allRevisionsService.getAllApprovedRevisions(options).subscribe(data=>{
      this.approvedRevisions = Object.assign(data);
    })


  }

}
