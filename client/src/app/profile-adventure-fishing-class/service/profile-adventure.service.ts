import { HttpClient, HttpEvent } from '@angular/common/http';
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

  getOneAdventure(id:Number,options:any) : Observable<HttpEvent<Adventure>>{
    return this.http.get<Adventure>(`${this.baseURL}` + "one-adventure/" + id,options);
  }

  getAdventurePictures(id:Number,options:any): Observable<HttpEvent<AdventureImage[]>>{
    return this.http.get<AdventureImage[]>(`${this.baseURLimages}`+ "uploads/get-adventure-pictures/" + id,options);

  }


  getInstructorByEmail(): Observable<User> {
    return this.http.get<User>(`${this.baseURL}` + 'findInstructorByUsername/' + sessionStorage.getItem('email'));
  }

  getAdventureReservations(adventureId:Number,options:any): Observable<HttpEvent<AdventureReservation[]>>{
    return this.http.get<AdventureReservation[]>(`${this.baseURL}` + "get-all-actions/adventureId/" + `${adventureId}`,options);
  }

  getAdventurePastReservations(adventureId:Number,options:any):Observable<HttpEvent<AdventureReservation[]>>{
    return this.http.get<AdventureReservation[]>(`${this.baseURL}` + "get-all-past-actions/adventureId/" + `${adventureId}`,options);
  }

  getAdventureAdditionalServices(adventureReservationId: Number,options:any): Observable<HttpEvent<AdditionalAdvService[]>>{
    return this.http.get<AdditionalAdvService[]>(`${this.baseURL}` + "get-all-additional-services/adventureReservationId/" + `${adventureReservationId}`,options);
  }

  deleteActionForAdventure(adventureReservationId: Number,options:any): Observable<Object>{
    return this.http.delete(`${this.baseURL}`+ "delete-action-for-adventure/adventureReservationId/" + `${adventureReservationId}`,options);
  }

  changeStatusOfActionBooking(options:any):Observable<Object>{
    return this.http.put(`${this.baseURL}`+ "change-status-of-action-booking" ,Boolean,options);
  }
}
