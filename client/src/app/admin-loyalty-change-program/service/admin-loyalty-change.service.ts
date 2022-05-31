import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoyaltyProgram } from 'src/app/dto/LoyaltyProgram';

@Injectable({
  providedIn: 'root'
})
export class AdminLoyaltyChangeService {

  private baseURL = "http://localhost:8084/users/";
  constructor(private http:HttpClient) { }

  getOneLoyaltyProgram(loyaltyProgramId:Number,options:any):Observable<HttpEvent<LoyaltyProgram>>{
    return this.http.get<LoyaltyProgram>(`${this.baseURL}`+"get-one-loyalty-program/loyaltyProgramId/"+`${loyaltyProgramId}`,options);
  }

  changeOneLoyaltyProgram(loyaltyProgram:LoyaltyProgram,options:any):Observable<Object>{
    return this.http.put(`${this.baseURL}`+"change-one-loyalty-program",loyaltyProgram,options);
  }
}
