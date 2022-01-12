import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { User } from '../dto/user';
import { Endpoint } from '../util/endpoints-enum';
import { Global } from '../util/global';

@Component({
  selector: 'app-instructor-details',
  templateUrl: './instructor-details.component.html',
  styleUrls: ['./instructor-details.component.css']
})
export class InstructorDetailsComponent implements OnInit {

  
  endpoint = Endpoint

  constructor(private router: Router,private http: HttpClient) { }

  instructor : User = new User()

  ngOnInit(): void 
  {
    const headers = { 'content-type': 'application/json'} 
    let options = { headers: headers };

    this.http.get<any>(this.endpoint.FIND_INSTRUCTOR + "/"+ Global.clickedInstructor.id, options).pipe(
      map(returnedInst => {
        this.instructor = returnedInst
      })).subscribe()
  }

}
