import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionReport } from '../dto/ActionReport';
import { ReportAboutClientsService } from './service/report-about-clients.service';

@Component({
  selector: 'app-report-about-clients',
  templateUrl: './report-about-clients.component.html',
  styleUrls: ['./report-about-clients.component.css']
})
export class ReportAboutClientsComponent implements OnInit {

  actionId !: Number;
  clientId !: Number;

  comment : String = "";
  badComment : Boolean = false;
  didNotShow : Boolean = false;

  reportDTO : ActionReport = new ActionReport();

  constructor(private router:Router,
              private activeRoute:ActivatedRoute,
              private reportAboutClientsService: ReportAboutClientsService) { }

  ngOnInit(): void {
     this.actionId =  this.activeRoute.snapshot.params['actionId'];
     this.clientId = this.activeRoute.snapshot.params['clientId'];
     console.log(this.actionId);
     console.log(this.clientId);

  }


  badCommentFunc(event: any){
    if ( event.target.checked ) {
      this.badComment = true;
    } else{
      this.badComment = false;
    }
  }

  didNotShowFunc(event: any){
    if ( event.target.checked ) {
      this.didNotShow = true;
     } else{
       this.didNotShow = false;
     }
  }

  report(actionId:Number,clientId:Number){
    const headers = { 'content-type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
      let options = { headers: headers };


    console.log(this.badComment);
    console.log(this.didNotShow);

    console.log(this.comment);
    if(this.didNotShow==true){
        this.badComment = true;
        this.reportDTO.actionReservationId = actionId;
        this.reportDTO.clientId = clientId;
        this.reportDTO.approved = true;
        this.reportDTO.comment = this.comment;
        this.reportDTO.punishClient = true;
    } else{
      this.reportDTO.actionReservationId = actionId;
      this.reportDTO.clientId = clientId;
      this.reportDTO.approved = false;
      this.reportDTO.comment = this.comment;
      this.reportDTO.punishClient = this.badComment;
    }
    console.log(this.reportDTO);

    this.reportAboutClientsService.reportAndPunishClient(this.reportDTO,options).subscribe();
    this.router.navigate(['clients-booked-action/',actionId]);
  }

  cancel(actionId:Number){
    this.router.navigate(['clients-booked-action/',actionId]);
  }

}
