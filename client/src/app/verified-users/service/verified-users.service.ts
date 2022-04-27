import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/dto/user';

@Injectable({
  providedIn: 'root'
})
export class VerifiedUsersService {

  private baseURL = "http://localhost:8084/users";
  constructor(private http:HttpClient) { }

  getRegUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.baseURL}`+"/verified");

  }
}
