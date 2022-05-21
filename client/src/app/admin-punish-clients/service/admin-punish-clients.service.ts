import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActionReport } from 'src/app/dto/ActionReport';
import { User } from 'src/app/dto/user';

@Injectable({
  providedIn: 'root'
})
export class AdminPunishClientsService {

  private baseURL = "http://localhost:8084";
  constructor(private http:HttpClient) { }

  getAllReportsForApproving(options:any):Observable<HttpEvent<ActionReport[]>>{
    return this.http.get<ActionReport[]>(`${this.baseURL}`+"/instructors/get-all-reports-for-approving",options);
  }

  getOneClient(clientId:Number,options:any):Observable<HttpEvent<User>>{
    return this.http.get<User>(`${this.baseURL}` + "/users/get-one-client/clientId/"+ `${clientId}`,options);
  }

  getInstructorForSpecificReport(reportId:Number,options:any):Observable<HttpEvent<User>>{
    return this.http.get<User>(`${this.baseURL}`+"/instructors/get-instructor-for-specific-report/reportId/" + `${reportId}`,options);
  }

  setApprovedPunishmentForReport(reportId:Number,options:any):Observable<Object>{
    return this.http.put(`${this.baseURL}`+"/instructors/set-approved-punishment-for-report/reportId/"+ `${reportId}`,reportId,options);
  }

  approvePunishmentForClient(clientId:Number,options:any):Observable<Object>{
    return this.http.put(`${this.baseURL}`+"/instructors/approve-punishment-for-client-admin/clientId/"+`${clientId}`,clientId,options);
  }

  sendMailApprovedPunishment(toEmail:String,options:any):Observable<Object>{
    return this.http.post(`${this.baseURL}`+"/emails/send-mail-approved-punishment/toEmail/"+`${toEmail}`,toEmail,options);
  }

  sendMailNotApprovedPunishment(toEmail:String,options:any):Observable<Object>{
    return this.http.post(`${this.baseURL}`+"/emails/send-mail-not-approved-punishment/toEmail/"+`${toEmail}`,toEmail,options);
  }
}
