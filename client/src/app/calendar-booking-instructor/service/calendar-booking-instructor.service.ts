import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdditionalAdvService } from 'src/app/dto/AdditionalAdvService';
import { AdventureReservation } from 'src/app/dto/AdventureReservation';
import { IncomeReservation } from 'src/app/dto/IncomeReservation';
import { InstructorAvailablePeriod } from 'src/app/dto/InstructorAvailablePeriod';
import { User } from 'src/app/dto/user';

@Injectable({
  providedIn: 'root'
})
export class CalendarBookingInstructorService {

  private baseURL = "http://localhost:8084/instructors/";
  private baseURLusers = "http://localhost:8084/users/";
  constructor(private http:HttpClient) { }

  getAllActiveActionsInstructor(options:any):Observable<HttpEvent<AdventureReservation[]>>{
    return this.http.get<AdventureReservation[]>(`${this.baseURL}`+"get-all-active-actions-instructor/instructorEmail/"+sessionStorage.getItem('email'),options);
  }

  getAdventureAdditionalServices(adventureReservationId: Number,options:any): Observable<HttpEvent<AdditionalAdvService[]>>{
    return this.http.get<AdditionalAdvService[]>(`${this.baseURL}` + "get-all-additional-services/adventureReservationId/" + `${adventureReservationId}`,options);
  }

  getInstructorInfo(options:any):Observable<HttpEvent<User>>{
    return this.http.get<User>(`${this.baseURLusers}`+"get-user/userEmail/"+sessionStorage.getItem('email'),options);
    
  }

  getAverageMarkInstructor(instructorId:Number,options:any):Observable<HttpEvent<Number>>{
    return this.http.get<Number>(`${this.baseURL}`+"get-average-mark-for-instructor/instructorId/"+`${instructorId}`,options);
  }

  getAvailabilityPeriod(instructorId:Number,options:any):Observable<HttpEvent<InstructorAvailablePeriod>>{
    return this.http.get<InstructorAvailablePeriod>(`${this.baseURL}`+ "get-period-of-availability/instructorId/" + instructorId,options); 
  }

  getAllIncomesForInstructor(instructorId:Number,options:any):Observable<HttpEvent<IncomeReservation[]>>{
    return this.http.get<IncomeReservation[]>(`${this.baseURL}` + "get-all-incomes-for-instructor/instructorId/"+`${instructorId}`,options);
  }

  getIncomeSum(instructorId:Number,options:any):Observable<HttpEvent<Number>>{
    return this.http.get<Number>(`${this.baseURL}`+"get-income-sum/instructorId/"+`${instructorId}`,options);
  }

}
