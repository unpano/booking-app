import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdditionalAdvService } from 'src/app/dto/AdditionalAdvService';
import { AdventureReservation } from 'src/app/dto/AdventureReservation';

@Injectable({
  providedIn: 'root'
})
export class ViewActionDetailsService {

  private baseURL = "http://localhost:8084/instructors/";
  constructor(private http:HttpClient) { }

  getOneAdventureAction(adventureActionId:Number,options:any): Observable<HttpEvent<AdventureReservation>>{
    return this.http.get<AdventureReservation>(`${this.baseURL}` + "get-one-action/adventureReservationId/" + `${adventureActionId}`,options);
  }

  getAdventureAdditionalServices(adventureReservationId: Number,options:any): Observable<HttpEvent<AdditionalAdvService[]>>{
    return this.http.get<AdditionalAdvService[]>(`${this.baseURL}` + "get-all-additional-services/adventureReservationId/" + `${adventureReservationId}`,options);
  }


}
