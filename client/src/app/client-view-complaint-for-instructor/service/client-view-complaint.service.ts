import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableLike } from 'rxjs';
import { ComplaintClient } from 'src/app/dto/ComplaintClient';

@Injectable({
  providedIn: 'root'
})
export class ClientViewComplaintService {

  private baseURL = "http://localhost:8084/";
  constructor(private http:HttpClient) { }

  getComplaintFromClient(clientId:Number,instructorId:Number,options:any):Observable<HttpEvent<ComplaintClient>>{
    return this.http.get<ComplaintClient>(`${this.baseURL}`+"reports/get-complaint-from-client-for-instructor/clientId/"+`${clientId}`+"/instructorId/"+`${instructorId}`,options);
  }


  
}
