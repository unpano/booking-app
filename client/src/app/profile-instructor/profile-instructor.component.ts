import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';
import { Instructor } from '../dto/instructor';
import { Endpoint } from '../util/endpoints-enum';

@Component({
  selector: 'app-profile-instructor',
  templateUrl: './profile-instructor.component.html',
  styleUrls: ['./profile-instructor.component.css']
})
export class ProfileInstructorComponent implements OnInit {

  instructor : Instructor = new Instructor()

  role : any

  actions : any

  endpoint = Endpoint

  constructor(private router: Router,private http: HttpClient, private dialog: MatDialog) { }

  ngOnInit(): void {

    this.role = sessionStorage.getItem('role')


    const headers = { 'content-type': 'application/json'} 
    let options = { headers: headers };

    this.http.get<any>(this.endpoint.FIND_INSTRUCTOR+ "/"+ sessionStorage.getItem('entityId'), options).pipe(
      map(returnedBoat => {
        this.instructor = returnedBoat
      })).subscribe()


      this.http.get<any>(this.endpoint.ACTIONS + sessionStorage.getItem('entityId'), options).pipe(
        map(returnedData => {
          this.actions = returnedData
        })).subscribe()

  }

}
