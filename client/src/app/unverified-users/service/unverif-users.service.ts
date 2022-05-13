import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/dto/user';

@Injectable({
  providedIn: 'root'
})
export class UnverifUsersService {

  private baseURL = "http://localhost:8084/users";
  private baseURLmail = "http://localhost:8084/emails/send-mail-simplified/";
  constructor(private http:HttpClient) { }

  getNonVerifUsers(options:any): Observable<HttpEvent<User[]>>{
    return this.http.get<User[]>(`${this.baseURL}`+ "/unverified",options );

  }

  verifyOne(email: String,user:User,options:any) : Observable<Object>{
    return this.http.put(`${this.baseURL}` + "/verify/" + `${email}`,user,options);

  }

  sendVerificationEmail(email: String,user: User,options:any) : Observable<Object> {
    return this.http.post(`${this.baseURLmail}` + `${email}`,user,options);
  }
}
