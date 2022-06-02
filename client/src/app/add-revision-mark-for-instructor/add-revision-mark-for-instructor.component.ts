import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Instructor } from '../dto/Instructor';
import { MarkRevisionClient } from '../dto/MarkRevisionClient';
import { AddRevisionMarkService } from './service/add-revision-mark.service';

@Component({
  selector: 'app-add-revision-mark-for-instructor',
  templateUrl: './add-revision-mark-for-instructor.component.html',
  styleUrls: ['./add-revision-mark-for-instructor.component.css']
})
export class AddRevisionMarkForInstructorComponent implements OnInit {


  marks = [ 1,2,3,4,5]
  mark : Number = 1;

  instructor : Instructor = new Instructor();
  instructorId !: Number;
  clientId !: Number;

  markRevision : MarkRevisionClient = new MarkRevisionClient();
  constructor(private addRevisionMarkService:AddRevisionMarkService,
              private activeRoute:ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {
    this.instructorId = this.activeRoute.snapshot.params['instructorId'];
    console.log(this.instructorId);
    this.clientId = this.activeRoute.snapshot.params['clientId'];
    console.log(this.clientId);

    this.addRevisionMarkService.getInstructorById(this.instructorId).subscribe(data=>{
      this.instructor = data;
      console.log(this.instructor);
    })
  }

  onSelectType(mark : Number)
  {
    this.mark = mark;
  }

  addRevision(){
   // console.log(this.instructorId);
   // console.log(this.clientId);
   // console.log(this.markRevision.revisionComment);
   // console.log(this.mark);

   const headers = { 'content-type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };

    this.markRevision.instructorId = this.instructorId;
    console.log(this.markRevision.instructorId);

    this.markRevision.clientId = this.clientId;
    console.log(this.markRevision.clientId);

    console.log(this.markRevision.revisionComment);

    this.markRevision.mark = this.mark;
    console.log(this.markRevision.mark);
    if(window.confirm("You want to add revision for this instructor?")){

    this.addRevisionMarkService.addNewRevisionMarkForInstructor(this.markRevision,options).subscribe(data=>{
      let returnValue = data;
      console.log(returnValue);
    });
    alert("You added revision for this instructor!");
    this.router.navigate(['clientReservations']);
  }else {
    window.close();
  }

  }

  back(){
    this.router.navigate(['clientReservations']);
  }

}
