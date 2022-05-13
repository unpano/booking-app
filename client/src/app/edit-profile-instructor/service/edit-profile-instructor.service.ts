import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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


}

