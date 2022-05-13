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
export class ClientReservationsService {

  private baseURL = "http://localhost:8084/instructors/";
  constructor(private http:HttpClient) { }

  getClient():Observable<User>{
    return this.http.get<User>(`${this.baseURL}`+ "findOneClient/" + sessionStorage.getItem("email"));
  }

  getAllActionsForClient(options:any):Observable<HttpEvent<AdventureReservation[]>>{
    return this.http.get<AdventureReservation[]>(`${this.baseURL}`+ "get-all-actions-client",options);
  }

  getAllAddServices(actionId:Number,options:any):Observable<HttpEvent<AdditionalAdvService[]>>{
    return this.http.get<AdditionalAdvService[]>(`${this.baseURL}`+"get-all-additional-services/adventureReservationId/" + `${actionId}`,options);
  }

  reserveOneAction(actionForReservation:ActionClientReserved,options:any):Observable<HttpEvent<ActionClientReserved>>{
    return this.http.post<ActionClientReserved>(`${this.baseURL}`+ "add-new-booking-for-action/actionId/" + `${actionForReservation.actionId}`+ "/clientId/"+ `${actionForReservation.clientId}`,actionForReservation, options);
  }


}
