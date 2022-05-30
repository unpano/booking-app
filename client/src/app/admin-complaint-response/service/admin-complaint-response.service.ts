import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ComplaintClient } from 'src/app/dto/ComplaintClient';

@Injectable({
  providedIn: 'root'
})
export class AdminComplaintResponseService {

  private baseURL = "http://localhost:8084/reports"
  constructor(private http:HttpClient) { }

  replyToComplaintAdmin(reply:ComplaintClient,options:any):Observable<Object>{
    return this.http.put(`${this.baseURL}`+"/reply-to-complaint-admin",reply,options);
  }
}
