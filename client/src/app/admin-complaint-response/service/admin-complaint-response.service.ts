import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminResponse } from 'src/app/dto/AdminResponse';
import { ComplaintClient } from 'src/app/dto/ComplaintClient';
import { User } from 'src/app/dto/user';

@Injectable({
  providedIn: 'root'
})
export class AdminComplaintResponseService {

  private baseURL = "http://localhost:8084/reports"
  private baseURLusers = "http://localhost:8084/users";
  private baseURLmails = "http://localhost:8084/emails";
  constructor(private http:HttpClient) { }

  replyToComplaintAdmin(reply:ComplaintClient,options:any):Observable<Object>{
    return this.http.put(`${this.baseURL}`+"/reply-to-complaint-admin",reply,options);
  }

  getInstructorInfo(instructorId:Number,options:any):Observable<HttpEvent<User>>{
    return this.http.get<User>(`${this.baseURLusers}`+"/get-user/userId/"+`${instructorId}`,options);
  }

  getClientInfo(clientId:Number,options:any):Observable<HttpEvent<User>>{
    return this.http.get<User>(`${this.baseURLusers}`+"/get-user/userId/"+`${clientId}`,options);
  }

  sendMailResponseAdminComplaint(adminResponse:AdminResponse,options:any):Observable<Object>{
    return this.http.post(`${this.baseURLmails}`+"/send-mail-admin-comment-to-complaint-client",adminResponse,options);
  }
}
