import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminResponse } from 'src/app/dto/AdminResponse';
import { User } from 'src/app/dto/user';

@Injectable({
  providedIn: 'root'
})
export class RejectVerificationUserService {

  private baseURL = "http://localhost:8084/";
  constructor(private http:HttpClient) { }

  getUserInfo(userId:Number,options:any):Observable<HttpEvent<User>>{
    return this.http.get<User>(`${this.baseURL}`+"users/get-user/userId/"+`${userId}`,options);
  }

  rejectVerification(email:String,user:User,options:any):Observable<Object>{
    return this.http.put(`${this.baseURL}`+"users/reject-verification/" + `${email}`,user,options);
  }

  sendRejectingEmail(adminResponse:AdminResponse,options:any):Observable<Object>{
    return this.http.post(`${this.baseURL}`+ "emails/send-mail-admin-rejecting-verification-user" ,adminResponse,options);
  }


}
