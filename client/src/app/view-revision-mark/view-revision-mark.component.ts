import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Instructor } from '../dto/Instructor';
import { MarkRevisionClient } from '../dto/MarkRevisionClient';
import { ViewRevisionMarkService } from './service/view-revision-mark.service';

@Component({
  selector: 'app-view-revision-mark',
  templateUrl: './view-revision-mark.component.html',
  styleUrls: ['./view-revision-mark.component.css']
})
export class ViewRevisionMarkComponent implements OnInit {

  instructorId !: Number;
  clientId !: Number;

  instructor : Instructor = new Instructor();

  markRevisionClientForInstructor : MarkRevisionClient = new MarkRevisionClient();
  constructor(private router:Router,
              private activeRoute:ActivatedRoute,
              private viewRevisionMarkService:ViewRevisionMarkService) { }

  ngOnInit(): void {
    const headers = { 'content-type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };

    this.clientId = this.activeRoute.snapshot.params['clientId'];
    console.log(this.clientId);
    this.instructorId = this.activeRoute.snapshot.params['instructorId'];
    console.log(this.instructorId);

    this.viewRevisionMarkService.getRevisionMarkForInstructor(this.clientId,this.instructorId,options).subscribe(data=>{
      this.markRevisionClientForInstructor = Object.assign(data);
      console.log(this.markRevisionClientForInstructor);
    })

    this.viewRevisionMarkService.getInstructorById(this.instructorId).subscribe(data=>{
      this.instructor = data;
    })

  }

  clientsReservations(){
    this.router.navigate(['clientReservations']);
  }

}
