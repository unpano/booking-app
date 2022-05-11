import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
