import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Complaint } from '../dto/complaint';
import { ReservationType } from '../dto/enums/ReservationType';
import { Endpoint } from '../util/endpoints-enum';

@Component({
  selector: 'app-complain-form',
  templateUrl: './complain-form.component.html',
  styleUrls: ['./complain-form.component.css']
})
export class ComplainFormComponent implements OnInit {

  endpoint = Endpoint

  name : any
  content :any

  complaint : Complaint = new Complaint()



  constructor(private router: Router,private http: HttpClient, private dialog: MatDialog) { }


  ngOnInit(): void {

  }

  add()
  {
    this.complaint.content = this.content
    this.complaint.name = this.name

    const headers = { 'content-type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem("token")}

    let options = { headers: headers };
          this.http.get<any>(this.endpoint.FIND_CLIENT+ sessionStorage.getItem('id'), options).pipe(
            map(returnedUser => {
              this.complaint.client = returnedUser
        })).subscribe( () => 
        {

          if(sessionStorage.getItem('reservationType') == 'BOAT')
          {
                this.http.get<any>(this.endpoint.FIND_BOAT + "/"+ sessionStorage.getItem('entityId'), options).pipe(
                  map(returnedBoat => {
                    this.complaint.boat = returnedBoat
                  })).subscribe( () => 
                    {
                      const body = JSON.stringify(this.complaint);  
      
                        
                      
                                this.http.post<any>(this.endpoint.ADD_COMPLAINT, body, options).pipe(
                                  map(returnedData => {
                                    this.complaint = returnedData
                                  })).subscribe()
      
      
                                  alert("You add complaint seccessfuly!")
        
      
                    })
          }
          else if(sessionStorage.getItem('reservationType') == 'COTTAGE')
          {
            this.http.get<any>(this.endpoint.FIND_COTTAGE + sessionStorage.getItem('entityId'), options).pipe(
              map(returnedBoat => {
                this.complaint.cottage = returnedBoat
              })).subscribe( () => 
                {
                  const body = JSON.stringify(this.complaint);  
  
                    
                  
                            this.http.post<any>(this.endpoint.ADD_COMPLAINT, body, options).pipe(
                              map(returnedData => {
                                this.complaint = returnedData
                              })).subscribe()
  
  
                              alert("You add complaint seccessfuly!")
    
  
                })
          }

          else if(sessionStorage.getItem('reservationType') == 'ADVENTURE')
          {
            this.http.get<any>(this.endpoint.FIND_ADVENTURE + "/"+ sessionStorage.getItem('entityId'), options).pipe(
              map(returnedBoat => {
                this.complaint.adventure = returnedBoat
              })).subscribe( () => 
                {
                  const body = JSON.stringify(this.complaint);  
  
                    
                  
                            this.http.post<any>(this.endpoint.ADD_COMPLAINT, body, options).pipe(
                              map(returnedData => {
                                this.complaint = returnedData
                              })).subscribe()
  
  
                              alert("You add complaint seccessfuly!")
    
  
                })
          }

       


        })

                


  }




}
