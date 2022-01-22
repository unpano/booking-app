import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ClientRate } from '../dto/clientRate';
import { Endpoint } from '../util/endpoints-enum';

@Component({
  selector: 'app-rate-form',
  templateUrl: './rate-form.component.html',
  styleUrls: ['./rate-form.component.css']
})
export class RateFormComponent implements OnInit {

  endpoint = Endpoint

  rate !: Number

  review!: String

  clientRate : ClientRate = new ClientRate()



  constructor(private router: Router,private http: HttpClient, private dialog: MatDialog) { }


  ngOnInit(): void {

  }

  add()
  {
    this.clientRate.rate = this.rate
    this.clientRate.review = this.review


    const headers = { 'content-type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem("token")}

    let options = { headers: headers };
          this.http.get<any>(this.endpoint.FIND_CLIENT+ sessionStorage.getItem('id'), options).pipe(
            map(returnedUser => {
              this.clientRate.client = returnedUser
        })).subscribe( () => 
        {

          if(sessionStorage.getItem('reservationType') == 'BOAT')
          {
                this.http.get<any>(this.endpoint.FIND_BOAT + "/"+ sessionStorage.getItem('entityId'), options).pipe(
                  map(returnedBoat => {
                    this.clientRate.boat = returnedBoat
                  })).subscribe( () => 
                    {
                      const body = JSON.stringify(this.clientRate);  
      
                        
                      
                                this.http.post<any>(this.endpoint.ADD_CLIENT_RATE, body, options).pipe(
                                  map(returnedData => {
                                    this.clientRate = returnedData
                                  })).subscribe()
      
      
                                  alert("Your rate is send seccessfuly !")
        
      
                    })
          }
          else if(sessionStorage.getItem('reservationType') == 'COTTAGE')
          {
            this.http.get<any>(this.endpoint.FIND_COTTAGE + sessionStorage.getItem('entityId'), options).pipe(
              map(returnedBoat => {
                this.clientRate.cottage = returnedBoat
              })).subscribe( () => 
                {
                  const body = JSON.stringify(this.clientRate);  
  
                    
                  
                            this.http.post<any>(this.endpoint.ADD_CLIENT_RATE, body, options).pipe(
                              map(returnedData => {
                                this.clientRate= returnedData
                              })).subscribe()
  
  
                              alert("Your rate is send seccessfuly !")
    
  
                })
          }

          else if(sessionStorage.getItem('reservationType') == 'ADVENTURE')
          {
            this.http.get<any>(this.endpoint.FIND_ADVENTURE + "/"+ sessionStorage.getItem('entityId'), options).pipe(
              map(returnedBoat => {
                this.clientRate.adventure = returnedBoat
              })).subscribe( () => 
                {
                  const body = JSON.stringify(this.clientRate);  
  
                    
                  
                            this.http.post<any>(this.endpoint.ADD_CLIENT_RATE, body, options).pipe(
                              map(returnedData => {
                                this.clientRate= returnedData
                              })).subscribe()
  
  
                              alert("Your rate is send seccessfuly !")
    
  
                })
          }

       


        })

                


  }



}
