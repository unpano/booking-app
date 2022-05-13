import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Adventure } from 'src/app/dto/Adventure';
import { AdventureImage } from 'src/app/dto/AdventureImage';
import { User } from 'src/app/dto/user';

@Injectable({
  providedIn: 'root'
})
export class EditProfileAdventureService {

  private baseURL = "http://localhost:8084/instructors/";
  private baseURLimages  = "http://localhost:8084/";
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

  changeAdventure(adventure: Adventure,options:any): Observable<Object>{
    return this.http.put(`${this.baseURL}`+ "change-one-adventure",adventure ,options);
  }
  

}
