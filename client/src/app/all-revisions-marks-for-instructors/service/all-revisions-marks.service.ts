import { HttpClient, HttpEvent } from '@angular/common/http';
import { not } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from 'src/app/dto/Client';
import { ComplaintClient } from 'src/app/dto/ComplaintClient';
import { Instructor } from 'src/app/dto/Instructor';
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

  getOneClient(clientId:Number,options:any):Observable<HttpEvent<Client>>{
    return this.http.get<Client>(`${this.baseURL}` + "users/get-one-client/clientId/"+`${clientId}`,options);
  }

  getOneInstructor(instructorId:Number):Observable<Instructor>{
    return this.http.get<Instructor>(`${this.baseURL}`+"instructors/findOne/"+`${instructorId}`);
  }

  approveRevision(notApprovedRevisionId:Number,options:any):Observable<Object>{
    return this.http.put(`${this.baseURL}`+"reports/approve-revision-for-instructor/revisionId/"+`${notApprovedRevisionId}`,notApprovedRevisionId,options);
  }

  rejectRevision(notApprovedRevisionId:Number,options:any):Observable<Object>{
    return this.http.put(`${this.baseURL}`+"reports/reject-revision-for-instructor/revisionId/"+`${notApprovedRevisionId}`,notApprovedRevisionId,options);
  }

  getAllComplaints(options:any):Observable<HttpEvent<ComplaintClient[]>>{
    return this.http.get<ComplaintClient[]>(`${this.baseURL}`+"reports/get-all-complaints-from-clients-for-instructors",options);
  }

  

}
