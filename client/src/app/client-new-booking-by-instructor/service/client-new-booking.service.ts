import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActionClientReserved } from 'src/app/dto/ActionClientReserved';
import { AdditionalAdvService } from 'src/app/dto/AdditionalAdvService';
import { AdventureReservation } from 'src/app/dto/AdventureReservation';
import { User } from 'src/app/dto/user';

@Injectable({
  providedIn: 'root'
})
export class ClientNewBookingService {

  private baseURL = "http://localhost:8084/";
  constructor(private http:HttpClient) { }

  getAdventureIByActionId(actionId:Number,options:any):Observable<HttpEvent<Number>>{
    return this.http.get<Number>(`${this.baseURL}`+"instructors/get-adventure-id-by-action-id/actionId/"+`${actionId}`,options);
  }

  getAllActionsForClient(clientId:Number,options:any):Observable<HttpEvent<AdventureReservation[]>>{
    return this.http.get<AdventureReservation[]>(`${this.baseURL}`+ "instructors/get-all-actions-client/clientId/" + `${clientId}`,options);
  }

  getAllAddServices(actionId:Number,options:any):Observable<HttpEvent<AdditionalAdvService[]>>{
    return this.http.get<AdditionalAdvService[]>(`${this.baseURL}`+"instructors/get-all-additional-services/adventureReservationId/" + `${actionId}`,options);
  }

  reserveOneAction(actionForReservation:ActionClientReserved,options:any):Observable<HttpEvent<ActionClientReserved>>{
    return this.http.post<ActionClientReserved>(`${this.baseURL}`+ "instructors/add-new-booking-for-action/actionId/" + `${actionForReservation.actionId}`+ "/clientId/"+ `${actionForReservation.clientId}`,actionForReservation, options);
  }

  sendMailNewReservationByInstructor(toEmail:String,options:any):Observable<Object>{
    return this.http.post(`${this.baseURL}`+"emails/send-mail-instructor-reserved-action-for-client/toEmail/"+`${toEmail}`,toEmail,options);
  }

  getClientInfo(clientId:Number,options:any):Observable<HttpEvent<User>>{
    return this.http.get<User>(`${this.baseURL}`+"users/get-user/userId/"+`${clientId}`,options);
  }



}
