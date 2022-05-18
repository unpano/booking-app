import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewReportActionService {

  private baseURL = "http://localhost:8084/instructors/";
  constructor(private http:HttpClient) { }

  getReportForActionAndClient(actionId:Number,clientId:Number,options:any):Observable<Object>{
    return this.http.get<Object>(`${this.baseURL}`+"get-report-action/actionId/" + `${actionId}`+"/clientId/" + `${clientId}`,options);
  }
}
