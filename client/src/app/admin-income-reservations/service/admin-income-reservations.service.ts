import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IncomeReservation } from 'src/app/dto/IncomeReservation';

@Injectable({
  providedIn: 'root'
})
export class AdminIncomeReservationsService {

  private baseURL = "http://localhost:8084/";
  constructor(private http:HttpClient) { }

  getAllIncomesForBookedActions(options:any):Observable<HttpEvent<IncomeReservation[]>>{
    return this.http.get<IncomeReservation[]>(`${this.baseURL}`+ "reports/get-all-incomes-for-booked-actions",options);
  }

  getIncomeSum(options:any):Observable<HttpEvent<Number>>{
    return this.http.get<Number>(`${this.baseURL}`+ "reports/get-incomes-sum",options);
  }
}

