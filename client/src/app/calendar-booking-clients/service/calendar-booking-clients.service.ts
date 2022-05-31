import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/dto/user';

@Injectable({
  providedIn: 'root'
})
export class CalendarBookingClientsService {

  private baseURL = "http://localhost:8084/instructors/";
  constructor(private http:HttpClient) { }

  getAllClientsForAction(actionId:Number,options:any):Observable<HttpEvent<User[]>>{
    return this.http.get<User[]>(`${this.baseURL}`+"get-all-clients-booked-action/actionId/" + `${actionId}`,options);
  }
}
