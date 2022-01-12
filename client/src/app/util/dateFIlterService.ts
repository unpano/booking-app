import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Endpoint } from './endpoints-enum';
import { Global } from './global';

@Injectable({
  providedIn: 'root',
})
export class DateFilterService {

  endpoint = Endpoint

  constructor(private http: HttpClient) { 
  }

  findForbiddenDate(){
    const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };
    this.http
                .get(this.endpoint.RESERVATIONS + "forbiddenDates",options)
                  .pipe(
                    map(returnedDates => {
                      Global.forbiddenDates = returnedDates
                      console.log(Global.forbiddenDates)
                    })).subscribe()
  }
}