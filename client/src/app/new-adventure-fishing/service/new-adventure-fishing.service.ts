import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Adventure } from 'src/app/dto/Adventure';
import { User } from 'src/app/dto/user';

@Injectable({
  providedIn: 'root'
})
export class NewAdventureFishingService {
 // /instructors/add-adventure
  private baseURL = "http://localhost:8084/instructors";
  
  private baseURLforAdventureImage = "http://localhost:8084/uploads/add-adventure-picture/";
  constructor(private http:HttpClient) { }

  addAdventure(adventure: Adventure,instructorId: Number,options:any): Observable<Object>{
    return this.http.post(`${this.baseURL}`+ "/add-adventure/" + `${instructorId}` ,adventure,options);

  }

  getInstructorInfo(): Observable<User>{
    return this.http.get<User>(`${this.baseURL}` + "/findInstructorByUsername/" + sessionStorage.getItem('email'));
  }

}
