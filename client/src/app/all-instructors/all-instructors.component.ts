import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { User } from '../dto/user';
import { Endpoint } from '../util/endpoints-enum';
import { Global } from '../util/global';

@Component({
  selector: 'app-all-instructors',
  templateUrl: './all-instructors.component.html',
  styleUrls: ['./all-instructors.component.css']
})
export class AllInstructorsComponent implements OnInit {

  endpoint = Endpoint
  searchText : any
  instructors: any;

  constructor(private router: Router,private http: HttpClient) { }


  

  ngOnInit(): void 
  {
    
    const headers = { 'content-type': 'application/json'} 
    let options = { headers: headers };

    this.http.get<any>(this.endpoint.ALL_INSTRUCTORS, options).pipe(
      map(returnedInstructors => {
        this.instructors = returnedInstructors
      })).subscribe()


  }

  viewDetails(instructor : User)
  {
    Global.clickedInstructor = instructor;
    this.router.navigate(["instructorDetails"]);

  }

}
