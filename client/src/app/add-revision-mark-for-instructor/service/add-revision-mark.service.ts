import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Instructor } from 'src/app/dto/Instructor';
import { MarkRevisionClient } from 'src/app/dto/MarkRevisionClient';

@Injectable({
  providedIn: 'root'
})
export class AddRevisionMarkService {

  private baseURL = "http://localhost:8084/";
  constructor(private http:HttpClient) { }

  getInstructorById(instructorId:Number):Observable<Instructor>{
    return this.http.get<Instructor>(`${this.baseURL}`+"instructors/findOne/"+`${instructorId}`);
  }

  addNewRevisionMarkForInstructor(markRevision:MarkRevisionClient,options:any):Observable<Object>{
    return this.http.post(`${this.baseURL}`+"reports/add-new-mark-revision-client",markRevision,options);
  }
}
