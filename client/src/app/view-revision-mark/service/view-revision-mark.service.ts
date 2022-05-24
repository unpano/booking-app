import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Instructor } from 'src/app/dto/Instructor';
import { MarkRevisionClient } from 'src/app/dto/MarkRevisionClient';

@Injectable({
  providedIn: 'root'
})
export class ViewRevisionMarkService {

  private baseURL = "http://localhost:8084/";
  constructor(private http:HttpClient) { }

  getRevisionMarkForInstructor(clientId:Number,instructorId:Number,options:any):Observable<HttpEvent<MarkRevisionClient>>{
      return this.http.get<MarkRevisionClient>(`${this.baseURL}`+"reports/get-mark-revision-client-for-instructor/clientId/" + `${clientId}`+ "/instructorId/" + `${instructorId}`,options);
  }

  getInstructorById(instructorId:Number):Observable<Instructor>{
    return this.http.get<Instructor>(`${this.baseURL}`+"instructors/findOne/"+`${instructorId}`);
  }
}
