import { getLocaleDirection } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Endpoint } from '../util/endpoints-enum';

@Component({
  selector: 'app-home-page-admin',
  templateUrl: './home-page-admin.component.html',
  styleUrls: ['./home-page-admin.component.css']
})
export class HomePageAdminComponent implements OnInit {

  private baseURL = "http://localhost:8084/instructors/";
  constructor(private http:HttpClient) { }

  action !: any;
  ngOnInit(): void {
    
  }

  getAction(){

    const headers = { 'content-type': 'application/json',
                      'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };
    var actionId = 5;
    this.http.get<any>(`${this.baseURL}`+ "get-one-action/adventureReservationId/" + `${actionId}`,options).subscribe(data=>{
        this.action = data;
        console.log(this.action);

    })

  }

}
