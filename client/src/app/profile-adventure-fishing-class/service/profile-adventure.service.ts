import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdditionalAdvService } from 'src/app/dto/AdditionalAdvService';
import { Adventure } from 'src/app/dto/Adventure';
import { AdventureImage } from 'src/app/dto/AdventureImage';
import { AdventureReservation } from 'src/app/dto/AdventureReservation';
import { User } from 'src/app/dto/user';

@Injectable({
  providedIn: 'root'
})
export class ProfileAdventureService {

  //uploads/get-adventure-pictures/**
  private baseURL = "http://localhost:8084/instructors/";
  private baseURLimages  ="http://localhost:8084/";
  constructor(private http: HttpClient) { }

  getOneAdventure(id:Number) : Observable<Adventure>{
    return this.http.get<Adventure>(`${this.baseURL}` + "one-adventure/" + id);
  }

  getAdventurePictures(id:Number): Observable<AdventureImage[]>{
    return this.http.get<AdventureImage[]>(`${this.baseURLimages}`+ "uploads/get-adventure-pictures/" + id);

  }


  getInstructorByEmail(): Observable<User> {
    return this.http.get<User>(`${this.baseURL}` + 'findInstructorByUsername/' + sessionStorage.getItem('email'));
  }

  getAdventureReservations(adventureId:Number): Observable<AdventureReservation[]>{
    return this.http.get<AdventureReservation[]>(`${this.baseURL}` + "get-all-actions/adventureId/" + `${adventureId}`);
  }

  getAdventureAdditionalServices(adventureReservationId: Number): Observable<AdditionalAdvService[]>{
    return this.http.get<AdditionalAdvService[]>(`${this.baseURL}` + "get-all-additional-services/adventureReservationId/" + `${adventureReservationId}`);
  }

  deleteActionForAdventure(adventureReservationId: Number): Observable<Object>{
    return this.http.delete(`${this.baseURL}`+ "delete-action-for-adventure/adventureReservationId/" + `${adventureReservationId}`);
  }
}
