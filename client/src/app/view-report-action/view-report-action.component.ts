import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionReport } from '../dto/ActionReport';
import { ViewReportActionService } from './service/view-report-action.service';

@Component({
  selector: 'app-view-report-action',
  templateUrl: './view-report-action.component.html',
  styleUrls: ['./view-report-action.component.css']
})
export class ViewReportActionComponent implements OnInit {

  actionId !: Number;
  clientId !: Number;

  report : ActionReport = new ActionReport();
  constructor(private router:Router,
              private activeRoute:ActivatedRoute,
              private viewReportActionService: ViewReportActionService) { }

  ngOnInit(): void {
      this.actionId = this.activeRoute.snapshot.params['actionId'];
      this.clientId = this.activeRoute.snapshot.params['clientId'];

      const headers = { 'content-type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
      let options = { headers: headers };
      
       this.viewReportActionService.getReportForActionAndClient(this.actionId,this.clientId,options).subscribe(data=>{
         this.report = Object.assign(data);
       })
  }

  cancel(actionId:Number){
    this.router.navigate(['clients-booked-action/',actionId]);
  }

}
