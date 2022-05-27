import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeactivationRequest } from 'src/app/dto/DeactivationRequest';
import { User } from 'src/app/dto/user';

@Injectable({
  providedIn: 'root'
})
export class DeletingRequestsService {

  private baseURL = "http://localhost:8084/users/";
  constructor(private http:HttpClient) { }

  getUserInfo(userEmail:String,options:any):Observable<HttpEvent<User>>{
    return this.http.get<User>(`${this.baseURL}`+"get-user/userEmail/"+`${userEmail}`,options);
  }

  sendDeactivationRequest(request:DeactivationRequest,options:any):Observable<Object>{
    return this.http.post(`${this.baseURL}`+"create-new-deactivation-request",request,options);
  }

  getDeactivationRequest(userId:Number,options:any):Observable<HttpEvent<DeactivationRequest>>{
    return this.http.get<DeactivationRequest>(`${this.baseURL}`+"get-deactivation-request/userId/"+`${userId}`,options);
  }

}
