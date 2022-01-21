import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Endpoint } from '../util/endpoints-enum';
import { Global } from '../util/global';

@Component({
  selector: 'app-profile-activation',
  templateUrl: './profile-activation.component.html',
  styleUrls: ['./profile-activation.component.css']
})
export class ProfileActivationComponent implements OnInit {

  
  endpoint = Endpoint
  user: any

  constructor(private router: Router,private http: HttpClient) { }

  ngOnInit(): void {
    
    this.http.get<any>(this.endpoint.GET_ACTIVE_USER ).pipe(
    map(returnedData => {
      this.user = returnedData
    })).subscribe()


  }

  activate()
  {
    const headers = { 'content-type': 'application/json'} 


    let options = { headers: headers };
    this.http.post<any>(this.endpoint.ACTIVATE_LINK + this.user.email, options ).pipe().subscribe();

    this.router.navigate(["login"])
  }

}
