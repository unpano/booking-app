import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeactivationRequest } from 'src/app/dto/DeactivationRequest';
import { User } from 'src/app/dto/user';

@Injectable({
  providedIn: 'root'
})
export class AdminRequestsDeletingService {

  private baseURL = "http://localhost:8084/";

  constructor(private http:HttpClient) { }

  getAllDeactivationRequests(options:any):Observable<HttpEvent<DeactivationRequest[]>>{
    return this.http.get<DeactivationRequest[]>(`${this.baseURL}`+"users/get-all-deactivation-requests",options);
  }

  getUserInfo(userId:Number,options:any):Observable<HttpEvent<User>>{
    return this.http.get<User>(`${this.baseURL}`+"users/get-user/userId/"+`${userId}`,options);
  }

  getIfUserCanBeDeleted(userEmail:String,options:any):Observable<HttpEvent<Boolean>>{
    return this.http.get<Boolean>(`${this.baseURL}`+"users/check-if-user-can-be-deleted/userEmail/"+`${userEmail}`,options);
  }

  rejectDeletingUser(userId:Number,options:any):Observable<Object>{
    return this.http.put(`${this.baseURL}`+"users/reject-user-deleting-by-admin/userId/"+`${userId}`,userId,options);
  }

  deleteCottageOwner(cottageOwnerId:Number,options:any):Observable<Object>{
    return this.http.delete(`${this.baseURL}`+ "cottageOwner/delete-cottage-owner/cottageOwnerId/"+ `${cottageOwnerId}`,options);
  }

  deleteBoatOwner(boatOwnerId:Number,options:any):Observable<Object>{
    return this.http.delete(`${this.baseURL}`+"boats/delete-boat-owner/boatOwnerId/"+`${boatOwnerId}`,options);
  }

  deleteInstructor(instructorId:Number,options:any):Observable<Object>{
    return this.http.delete(`${this.baseURL}`+"instructors/delete-instructor/instructorId/" + `${instructorId}`,options);
  }

  deleteClient(clientId:Number,options:any):Observable<Object>{
    return this.http.delete(`${this.baseURL}`+"users/delete-client/clientId/"+`${clientId}`,options);
  }

  deleteAdmin(adminId:Number,options:any):Observable<Object>{
    return this.http.delete(`${this.baseURL}`+"users/delete-admin/adminId/"+`${adminId}`,options);
  }

  approveRequestForDeletingAccount(userId:Number,options:any):Observable<Object>{
    return this.http.put(`${this.baseURL}`+"users/approve-request-for-deleting-account/userId/"+`${userId}`,userId,options);
  }



}
