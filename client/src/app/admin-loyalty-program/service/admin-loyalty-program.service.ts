import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoyaltyProgram } from 'src/app/dto/LoyaltyProgram';

@Injectable({
  providedIn: 'root'
})
export class AdminLoyaltyProgramService {

  private baseURL = "http://localhost:8084/users/";
  constructor(private http:HttpClient) { }

  getAllLoyaltyPrograms(options:any):Observable<HttpEvent<LoyaltyProgram[]>>{
    return this.http.get<LoyaltyProgram[]>(`${this.baseURL}`+"get-all-loyalty-programs",options);
  }

}
