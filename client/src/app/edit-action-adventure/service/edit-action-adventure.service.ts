import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdditionalAdvService } from 'src/app/dto/AdditionalAdvService';
import { AdventureReservation } from 'src/app/dto/AdventureReservation';

@Injectable({
  providedIn: 'root'
})
export class EditActionAdventureService {

  private baseURL = "http://localhost:8084/instructors/";
  constructor(private http:HttpClient) { }

  getOneAdventureAction(adventureActionId:Number): Observable<AdventureReservation>{
    return this.http.get<AdventureReservation>(`${this.baseURL}` + "get-one-action/adventureReservationId/" + `${adventureActionId}`);
  }

  getAdventureAdditionalServices(adventureReservationId: Number): Observable<AdditionalAdvService[]>{
    return this.http.get<AdditionalAdvService[]>(`${this.baseURL}` + "get-all-additional-services/adventureReservationId/" + `${adventureReservationId}`);
  }

  changeOneAction(adventureAction: AdventureReservation,adventureReservationId:Number): Observable<Object>{
    return this.http.put(`${this.baseURL}` + "change-one-action/adventureReservationId/" + `${adventureReservationId}`,adventureAction);
  }

  
}
