import { Component, OnInit } from '@angular/core';
import { report } from 'process';
import { ActionReport } from '../dto/ActionReport';
import { User } from '../dto/user';
import { AdminPunishClientsService } from './service/admin-punish-clients.service';

@Component({
  selector: 'app-admin-punish-clients',
  templateUrl: './admin-punish-clients.component.html',
  styleUrls: ['./admin-punish-clients.component.css']
})
export class AdminPunishClientsComponent implements OnInit {

  reportsForApproving : ActionReport[] = new Array();
  constructor(private adminPunishClientsService: AdminPunishClientsService) { }

  ngOnInit(): void {
    const headers = { 'content-type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };
    
    this.adminPunishClientsService.getAllReportsForApproving(options).subscribe(data=>{
      this.reportsForApproving = Object.assign(data);

      this.reportsForApproving.forEach(reportForAprove => {
          
          this.adminPunishClientsService.getOneClient(reportForAprove.clientId,options).subscribe(clientBackInfo=>{
            reportForAprove.clientInfo = new User();
            reportForAprove.isRejectedForApproving = false;
            reportForAprove.clientInfo = Object.assign(clientBackInfo);
          })

          this.adminPunishClientsService.getInstructorForSpecificReport(reportForAprove.id,options).subscribe(backInstructor=>{
            let instructor = Object.assign(backInstructor);
            reportForAprove.instructorInfo = new User();
            reportForAprove.instructorInfo = Object.assign(backInstructor);
          })
      });
    })
  }

  punishClient(reportForAprove:ActionReport){
    

    if(window.confirm("You want to punish this client?")){

      if(reportForAprove.isRejectedForApproving==true){
        reportForAprove.isRejectedForApproving = false;
      }

       const headers = { 'content-type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
      let options = { headers: headers };

      this.adminPunishClientsService.sendMailApprovedPunishment(reportForAprove.clientInfo.email,options).subscribe();
      this.adminPunishClientsService.sendMailApprovedPunishment(reportForAprove.instructorInfo.email,options).subscribe();

      this.adminPunishClientsService.getInstructorForSpecificReport(reportForAprove.id,options).subscribe(data=>{
      let instructor = data;
      console.log(instructor);

      this.adminPunishClientsService.setApprovedPunishmentForReport(reportForAprove.id,options).subscribe();
      this.adminPunishClientsService.approvePunishmentForClient(reportForAprove.clientId,options).subscribe();
      alert("Client is punished!");

      window.setInterval('document.location.reload()', 1000);
    })


  
  }  else {
    window.close();
    


  } 


  }

  rejectPunishing(reportForAprove:ActionReport){

    if(window.confirm("You want to reject this request for punishment?")){
      const headers = { 'content-type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
      let options = { headers: headers };

       if(reportForAprove.isRejectedForApproving==false){
        reportForAprove.isRejectedForApproving=true;
      }

      this.adminPunishClientsService.sendMailNotApprovedPunishment(reportForAprove.clientInfo.email,options).subscribe();
      this.adminPunishClientsService.sendMailNotApprovedPunishment(reportForAprove.instructorInfo.email,options).subscribe();
      alert("Request for punishing client rejected!");

  } else{
    window.close();
  }

  }




}
