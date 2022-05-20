import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/dto/user';

@Injectable({
  providedIn: 'root'
})
export class ProfileAdminService {

  private baseURL = "http://localhost:8084"
  constructor(private http:HttpClient) { }

  getOneAdmin(options:any):Observable<Object>{
    return this.http.get<Object>(`${this.baseURL}`+ "/users/get-one-admin/"+ sessionStorage.getItem('email'),options);
  }

  saveAdminChanges(changedAdmin:User,options:any):Observable<Object>{
    return this.http.put(`${this.baseURL}`+ "/users/change-admin-info/" + sessionStorage.getItem('email'),changedAdmin,options);
  }
}
