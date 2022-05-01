import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Adventure } from 'src/app/dto/Adventure';

@Injectable({
  providedIn: 'root'
})
export class NewAdventureFishingService {
 // /instructors/add-adventure
  private baseURL = "http://localhost:8084/instructors";
  
  private baseURLforAdventureImage = "http://localhost:8084/uploads/add-adventure-picture/";
  constructor(private http:HttpClient) { }

  addAdventure(adventure: Adventure): Observable<Object>{
    return this.http.post(`${this.baseURL}`+ "/add-adventure" ,adventure);

  }

  addAdventureImage(id: Number,formData: FormData) : Observable<Object> {
    return this.http.post(`${this.baseURLforAdventureImage}` + `${id}`,formData);
  }

}
