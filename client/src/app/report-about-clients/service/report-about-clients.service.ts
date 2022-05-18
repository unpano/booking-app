import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActionReport } from 'src/app/dto/ActionReport';

@Injectable({
  providedIn: 'root'
})
export class ReportAboutClientsService {

  private baseURL= "http://localhost:8084/instructors/";
  constructor(private http:HttpClient) { }

  reportAndPunishClient(report: ActionReport,options:any):Observable<Object>{
      return this.http.post(`${this.baseURL}`+"report-and-punish-client",report,options);
  }
}
