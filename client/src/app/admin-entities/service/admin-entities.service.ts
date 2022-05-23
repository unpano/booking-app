import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BoatOwner } from 'src/app/dto/BoatOwner';
import { Cottage } from 'src/app/dto/cottage';
import { CottageOwner } from 'src/app/dto/CottageOwner';
import { Boat } from 'src/app/dto/boat';
import { Instructor } from 'src/app/dto/Instructor';
import { Client } from 'src/app/dto/Client';

@Injectable({
  providedIn: 'root'
})
export class AdminEntitiesService {

  private baseURL = "http://localhost:8084/";
  constructor(private http:HttpClient) { }

  getAllCottageOwners(options:any):Observable<HttpEvent<CottageOwner[]>>{
    return this.http.get<CottageOwner[]>(`${this.baseURL}`+"cottageOwner/get-all-cottage-owners",options);
  }

  deleteCottageOwner(cottageOwnerId:Number,options:any):Observable<Object>{
    return this.http.delete(`${this.baseURL}`+ "cottageOwner/delete-cottage-owner/cottageOwnerId/"+ `${cottageOwnerId}`,options);
  }

  getAllCottages(options:any):Observable<HttpEvent<Cottage[]>>{
    return this.http.get<Cottage[]>(`${this.baseURL}`+"cottages/get-all-cottages-for-admin",options);
  }

  deleteCottage(cottageId:Number,options:any):Observable<Object>{
    return this.http.delete(`${this.baseURL}`+ "cottages/delete-cottage/cottageId/"+`${cottageId}`,options);

  }

  getAllBoatOwners(options:any):Observable<HttpEvent<BoatOwner[]>>{
    return this.http.get<BoatOwner[]>(`${this.baseURL}`+"boats/get-all-boat-owner",options);

  }

  deleteBoatOwner(boatOwnerId:Number,options:any):Observable<Object>{
    return this.http.delete(`${this.baseURL}`+"boats/delete-boat-owner/boatOwnerId/"+`${boatOwnerId}`,options);
  }

  getAllBoats(options:any):Observable<HttpEvent<Boat[]>>{
    return this.http.get<Boat[]>(`${this.baseURL}`+"boats/get-all-boats-for-admin",options);
  }

  deleteBoat(boatId:Number,options:any):Observable<Object>{
    return this.http.delete(`${this.baseURL}`+ "boats/delete-boat/boatId/"+`${boatId}`,options);
  }

  getAllInstructors(options:any):Observable<HttpEvent<Instructor[]>>{
    return this.http.get<Instructor[]>(`${this.baseURL}`+"instructors/get-all-instructors-for-admin",options);
  }

  deleteInstructor(instructorId:Number,options:any):Observable<Object>{
    return this.http.delete(`${this.baseURL}`+"instructors/delete-instructor/instructorId/" + `${instructorId}`,options);
  }

  getAllClients(options:any):Observable<HttpEvent<Client[]>>{
    return this.http.get<Client[]>(`${this.baseURL}`+"users/get-all-clients-for-admin",options);
  }

  deleteClient(clientId:Number,options:any):Observable<Object>{
    return this.http.delete(`${this.baseURL}`+"users/delete-client/clientId/"+`${clientId}`,options);
  }
  
}
