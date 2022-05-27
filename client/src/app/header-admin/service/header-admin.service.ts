import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/dto/user';

@Injectable({
  providedIn: 'root'
})
export class HeaderAdminService {

  private baseURL = "http://localhost:8084/users";
  constructor(private http:HttpClient) { }

  checkIfAdminIsOther(options:any):Observable<Object>{
    return this.http.get<Object>(`${this.baseURL}`+ "/check-if-admin-is-first-or-other/email/" + sessionStorage.getItem('email'),options);
  }

  checkIfOtherAdminChangedPassword(options:any):Observable<Object>{
    return this.http.get<Object>(`${this.baseURL}`+ "/check-if-other-admin-changed-password/email/" + sessionStorage.getItem('email'),options);
  }

  getAdmin(options:any):Observable<HttpEvent<User>>{
    return this.http.get<User>(`${this.baseURL}`+"/get-one-admin/"+sessionStorage.getItem('email'),options);
  }
}
