import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/dto/user';

@Injectable({
  providedIn: 'root'
})
export class UnverifUsersService {

  private baseURL = "http://localhost:8084/users";
  constructor(private http:HttpClient) { }

  getNonVerifUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.baseURL}`+ "/unverified" );

  }

  verifyOne(email: String,user:User) : Observable<Object>{
    return this.http.put(`${this.baseURL}` + "/verify/" + `${email}`,user);

  }
}