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

  

  findForbiddenDatesCottage(){
    const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };
    this.http
                .get(this.endpoint.RESERVATIONS + "forbiddenDatesCottage",options)
                  .pipe(
                    map(returnedDates => {
                      Global.forbiddenDatesCottage = returnedDates
                      //console.log(Global.forbiddenDatesCottage)
                    })).subscribe(() =>{
                      
                    })
  }

  findForbiddenDatesBoat(){
    const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };
    this.http
                        .get(this.endpoint.RESERVATIONS + "forbiddenDatesBoat",options)
                          .pipe(
                            map(returnedDates => {
                              Global.forbiddenDatesBoat = returnedDates
                              //console.log(Global.forbiddenDatesBoat)
                            })).subscribe()
  }
}