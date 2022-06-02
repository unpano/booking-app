import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdditionalAdvService } from 'src/app/dto/AdditionalAdvService';
import { Adventure } from 'src/app/dto/Adventure';
import { AdventureReservation } from 'src/app/dto/AdventureReservation';
import { User } from 'src/app/dto/user';
import { AddService } from '../new-action-adventure.component';

@Injectable({
  providedIn: 'root'
})
export class NewActionAdventureService {

  private baseURL  = "http://localhost:8084/instructors/";
  private baseURLemails = "http://localhost:8084/emails/";
  constructor(private http:HttpClient) { }


  getOneAdventure(id:Number,options:any) : Observable<HttpEvent<Adventure>>{
    return this.http.get<Adventure>(`${this.baseURL}` + "one-adventure/" + id,options);
  }

  addAdventureAction(advReserv: AdventureReservation,advId: Number,options:any): Observable<HttpEvent<AdventureReservation>>{
    return this.http.post<AdventureReservation>(`${this.baseURL}`+ "add-new-action/adventureId/" + `${advId}`,advReserv,options);
  }

  addAdditonalServAdv(addServList: String[],advReservId: Number,options:any): Observable<HttpEvent<AdditionalAdvService[]>>{
    return this.http.post<AdditionalAdvService[]>(`${this.baseURL}`+ "add-additional-services-adventure-reservation/" + `${advReservId}`,addServList,options);
  }

  getForbidenDates(options:any):Observable<HttpEvent<Date[]>>{
    return this.http.get<Date[]>(`${this.baseURL}`+ "get-forbiden-dates",options);
  }

  getAllClientsForEmailingAboutNewAction(adventureId:Number,options:any):Observable<HttpEvent<User[]>>{
    return this.http.get<User[]>(`${this.baseURL}` + "get-all-clients-for-emailing-about-new-action/adventureId/"+`${adventureId}`,options);
  }

  sendMailForSubscribedClients(clientEmail:String,options:any):Observable<Object>{
    return this.http.post(`${this.baseURLemails}`+"send-mail-client-about-new-action/toEmail/"+`${clientEmail}`,clientEmail,options);
  }
}
