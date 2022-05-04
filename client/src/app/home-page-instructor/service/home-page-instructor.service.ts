import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Adventure } from 'src/app/dto/Adventure';
import { User } from 'src/app/dto/user';

@Injectable({
  providedIn: 'root'
})
export class HomePageInstructorService {


  private baseURL = "http://localhost:8084/instructors/";
  constructor(private http: HttpClient) { }

  getAllAdventures(): Observable<Adventure[]>{
    return this.http.get<Adventure[]>(`${this.baseURL}` + "all-adventures");
  }

  getOneAdventure(id:Number) : Observable<Adventure>{
    return this.http.get<Adventure>(`${this.baseURL}` + "one-adventure/" + id);
  }

  
  
}
