import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdditionalAdvService } from 'src/app/dto/AdditionalAdvService';
import { Adventure } from 'src/app/dto/Adventure';
import { AdventureReservation } from 'src/app/dto/AdventureReservation';
import { AddService } from '../new-action-adventure.component';

@Injectable({
  providedIn: 'root'
})
export class NewActionAdventureService {

  private baseURL  = "http://localhost:8084/instructors/";
  constructor(private http:HttpClient) { }


  getOneAdventure(id:Number) : Observable<Adventure>{
    return this.http.get<Adventure>(`${this.baseURL}` + "one-adventure/" + id);
  }

  addAdventureAction(advReserv: AdventureReservation,advId: Number): Observable<AdventureReservation>{
    return this.http.post<AdventureReservation>(`${this.baseURL}`+ "add-new-action/adventureId/" + `${advId}`,advReserv);
  }

  addAdditonalServAdv(addServList: String[],advReservId: Number): Observable<AdditionalAdvService[]>{
    return this.http.post<AdditionalAdvService[]>(`${this.baseURL}`+ "add-additional-services-adventure-reservation/" + `${advReservId}`,addServList);
  }
}
