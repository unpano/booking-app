import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MarkRevisionClient } from 'src/app/dto/MarkRevisionClient';

@Injectable({
  providedIn: 'root'
})
export class AllRevisionsMarksService {

  private baseURL = "http://localhost:8084/";
  constructor(private http:HttpClient) { }

  getAllNotApprovedRevisions(options:any):Observable<HttpEvent<MarkRevisionClient[]>>{
    return this.http.get<MarkRevisionClient[]>(`${this.baseURL}`+"reports/get-all-not-approved-marks-revisions",options);
  
  }

  getAllApprovedRevisions(options:any):Observable<HttpEvent<MarkRevisionClient[]>>{
    return this.http.get<MarkRevisionClient[]>(`${this.baseURL}`+"reports/get-all-approved-marks-revisions",options);
  }


}
