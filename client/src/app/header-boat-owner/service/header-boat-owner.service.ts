import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/dto/user';

@Injectable({
  providedIn: 'root'
})
export class HeaderBoatOwnerService {

  private baseURL = "http://localhost:8084/users";
  constructor(private http:HttpClient) { }

  getBoatOwner(options:any):Observable<HttpEvent<User>>{
    return this.http.get<User>(`${this.baseURL}`+"/get-one-boat-owner/"+sessionStorage.getItem('email'),options);
  }
}
