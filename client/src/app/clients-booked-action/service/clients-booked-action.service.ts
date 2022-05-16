import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/dto/user';


@Injectable({
  providedIn: 'root'
})
export class ClientsBookedActionService {

  private baseURL = "http://localhost:8084/instructors/";
  constructor(private http:HttpClient) { }

  getAllClientsBookedAction(actionId:Number,options:any):Observable<HttpEvent<User[]>>{
    return this.http.get<User[]>(`${this.baseURL}`+ "get-all-clients-booked-action/actionId/" + `${actionId}`,options);
    
  }

  getAdventureIdForAction(actionId:Number,options:any):Observable<Object>{
      return this.http.get<Object>(`${this.baseURL}`+ "find-adventure-id-for-action/actionId/" + `${actionId}`,options);
  }
}
