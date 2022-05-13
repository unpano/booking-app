import { HttpClient, HttpEvent } from '@angular/common/http';
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

  getAllAdventures(id:Number,options:any): Observable<HttpEvent<Adventure[]>>{
    return this.http.get<Adventure[]>(`${this.baseURL}` + "all-adventures/" + `${id}`,options);
  }

  getOneAdventure(id:Number,options:any) : Observable<HttpEvent<Adventure>>{
    return this.http.get<Adventure>(`${this.baseURL}` + "one-adventure/" + id,options);
  }

  getInstructorInfo(): Observable<User>{
    return this.http.get<User>(`${this.baseURL}` + "findInstructorByUsername/" + sessionStorage.getItem('email'));
  }

  deleteOneAdventure(adventureId:Number,options:any):Observable<Object>
  {
    return this.http.delete(`${this.baseURL}`+ "delete-adventure/adventureId/"+ adventureId,options);
  }

  changeNumOfActiveActions(adventureId:Number,options:any):Observable<Object>{
    return this.http.put(`${this.baseURL}`+ "change-num-of-active-actions/adventureId/" + adventureId,adventureId,options);
  }

  changeNumOfPastActions(adventureId:Number,options:any):Observable<Object>{
    return this.http.put(`${this.baseURL}`+ "change-num-of-past-actions/adventureId/" + adventureId,adventureId,options);
  }

  
  
}
