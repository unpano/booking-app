import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Adventure } from 'src/app/dto/Adventure';

@Injectable({
  providedIn: 'root'
})
export class HomePageInstructorService {


  private baseURL = "http://localhost:8084/instructors/all-adventures";
  constructor(private http: HttpClient) { }

  getAllAdventures(): Observable<Adventure[]>{
    return this.http.get<Adventure[]>(`${this.baseURL}`);
  }
}
