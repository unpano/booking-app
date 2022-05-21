import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InstructorAvailablePeriod } from 'src/app/dto/InstructorAvailablePeriod';
import { User } from 'src/app/dto/user';

@Injectable({
  providedIn: 'root'
})
export class ProfileInstructorService {

  private baseURL = "http://localhost:8084/instructors/";
  constructor(private http:HttpClient) { }

  getInstructorByEmail(): Observable<User> {
    return this.http.get<User>(`${this.baseURL}` + 'findInstructorByUsername/' + sessionStorage.getItem('email'));
  }

  getAvailabilityPeriod(instructorId:Number,options:any):Observable<HttpEvent<InstructorAvailablePeriod>>{
    return this.http.get<InstructorAvailablePeriod>(`${this.baseURL}`+ "get-period-of-availability/instructorId/" + instructorId,options); 
  }
}
