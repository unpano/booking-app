import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InstructorAvailablePeriod } from 'src/app/dto/InstructorAvailablePeriod';
import { User } from 'src/app/dto/user';

@Injectable({
  providedIn: 'root'
})
export class EditProfileInstructorService {

  private baseURL = "http://localhost:8084/instructors/";
  constructor(private http:HttpClient) { }

  getInstructor(instructorId: Number): Observable<User>{
    return this.http.get<User>(`${this.baseURL}`+ "findOne/" + instructorId);
  }

  changeInstructor(instructor: User,instructorId:Number,options:any): Observable<Object>{
    return this.http.put(`${this.baseURL}`+ "change-instructor-info/instructorId/" + instructorId,instructor,options);
  }

  changeAvailabilityPeriod(newPeriod: InstructorAvailablePeriod,options:any):Observable<Object>{
    return this.http.post(`${this.baseURL}`+ "change-period-of-availability-instructor",newPeriod,options);
  }

  getAvailabilityPeriod(instructorId:Number,options:any):Observable<HttpEvent<InstructorAvailablePeriod>>{
    return this.http.get<InstructorAvailablePeriod>(`${this.baseURL}`+ "get-period-of-availability/instructorId/" + instructorId,options); 
  }

}

