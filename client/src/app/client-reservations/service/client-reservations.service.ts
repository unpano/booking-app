import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActionClientReserved } from 'src/app/dto/ActionClientReserved';
import { AdditionalAdvService } from 'src/app/dto/AdditionalAdvService';
import { AdventureReservation } from 'src/app/dto/AdventureReservation';
import { HasRevisionFromClient } from 'src/app/dto/HasRevisionFromClient';
import { Instructor } from 'src/app/dto/Instructor';
import { User } from 'src/app/dto/user';

@Injectable({
  providedIn: 'root'
})
export class ClientReservationsService {

  private baseURLinstructors = "http://localhost:8084/instructors/";
  private baseURLreport = "http://localhost:8084/reports/";
  constructor(private http:HttpClient) { }

  getClient():Observable<User>{
    return this.http.get<User>(`${this.baseURLinstructors}`+ "findOneClient/" + sessionStorage.getItem("email"));
  }

  getAllActionsForClient(clientId:Number,options:any):Observable<HttpEvent<AdventureReservation[]>>{
    return this.http.get<AdventureReservation[]>(`${this.baseURLinstructors}`+ "get-all-actions-client/clientId/" + `${clientId}`,options);
  }

  getAllBookedActionsForClient(clientId:Number,options:any):Observable<HttpEvent<AdventureReservation[]>>{
    return this.http.get<AdventureReservation[]>(`${this.baseURLinstructors}`+ "get-all-booked-actions/clientId/" + `${clientId}`,options);
  }

  getAllAddServices(actionId:Number,options:any):Observable<HttpEvent<AdditionalAdvService[]>>{
    return this.http.get<AdditionalAdvService[]>(`${this.baseURLinstructors}`+"get-all-additional-services/adventureReservationId/" + `${actionId}`,options);
  }

  reserveOneAction(actionForReservation:ActionClientReserved,options:any):Observable<HttpEvent<ActionClientReserved>>{
    return this.http.post<ActionClientReserved>(`${this.baseURLinstructors}`+ "add-new-booking-for-action/actionId/" + `${actionForReservation.actionId}`+ "/clientId/"+ `${actionForReservation.clientId}`,actionForReservation, options);
  }

  cancelBookingAction(actionId:Number,clientId:Number,options:any):Observable<Object>{
    return this.http.delete(`${this.baseURLinstructors}` + "cancel-booking-for-action/actionId/" + `${actionId}`+ "/clientId/" + `${clientId}`,options);
  }

  getAllInstructorsForMarkAndRevision(clientId:Number,options:any):Observable<HttpEvent<Instructor[]>>{
    return this.http.get<Instructor[]>(`${this.baseURLreport}` + "get-all-instructor-for-revision-and-mark/clientId/" + `${clientId}`,options);
  }

  checkIfInstructorHasRevisionFromClient(clientId:Number,instructorId:Number,options:any):Observable<HttpEvent<Boolean>>{
    return this.http.get<Boolean>(`${this.baseURLreport}`+ "check-if-instructor-has-revision-from-client/clientId/" + `${clientId}`+"/instructorId/" + `${instructorId}`,options);
  }

}
