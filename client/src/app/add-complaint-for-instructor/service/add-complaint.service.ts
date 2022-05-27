import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ComplaintClient } from 'src/app/dto/ComplaintClient';

@Injectable({
  providedIn: 'root'
})
export class AddComplaintService {

  private baseURL = "http://localhost:8084/";
  constructor(private http:HttpClient) { }

  saveComplaint(complaint:ComplaintClient,options:any):Observable<Object>{
    return this.http.post(`${this.baseURL}`+"reports/add-complaint-for-instructor",complaint,options);
  }
}
