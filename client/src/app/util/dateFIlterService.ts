import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Parameter } from '../dto/parameter';
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
                .get(this.endpoint.RESERVATIONS + "forbiddenDatesCottage/" + sessionStorage.getItem("cottageId"),options)
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
                        .get(this.endpoint.RESERVATIONS + "forbiddenDatesBoat/" + sessionStorage.getItem("boatId"),options)
                          .pipe(
                            map(returnedDates => {
                              Global.forbiddenDatesBoat = returnedDates
                              //console.log(Global.forbiddenDatesBoat)
                            })).subscribe()
  }

  populateChartMonthly(){
    //populate chart
    let monthly : any[] = []

    const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };
  
   //console.log(this.monthly)
   this.http
   .get(this.endpoint.CHARTS + "monthly/" + sessionStorage.getItem('boatId') ,options)
     .pipe(
       map(returnedListOfMonths => {
         let array:any = returnedListOfMonths
         array.forEach((element: Parameter) => {
           monthly.push(element)
         });
         console.log(monthly)      
       })).subscribe()
    return monthly
  }

  populateChartWeekly(){
    //populate chart
    let weekly : any[] = []

    const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };
  
   //console.log(this.monthly)
   this.http
   .get(this.endpoint.CHARTS + "weekly/" + sessionStorage.getItem('boatId') ,options)
     .pipe(
       map(returnedListOfMonths => {
         let array:any = returnedListOfMonths
         array.forEach((element: Parameter) => {
           weekly.push(element)
         });
         console.log(weekly)      
       })).subscribe()
    return weekly
  }
}