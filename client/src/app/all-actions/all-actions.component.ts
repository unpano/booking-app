import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';
import { map } from 'rxjs/operators';
import { Endpoint } from '../util/endpoints-enum';

@Component({
  selector: 'app-all-actions',
  templateUrl: './all-actions.component.html',
  styleUrls: ['./all-actions.component.css']
})
export class AllActionsComponent implements OnInit {

  actions : any
  endpoint = Endpoint

  constructor(private router: Router,private http: HttpClient, private dialog: MatDialog) { }

  ngOnInit(): void {


    const headers = { 'content-type': 'application/json'} 
    let options = { headers: headers };

    this.http.get<any>(this.endpoint.ACTIONS + sessionStorage.getItem('entityId'), options).pipe(
      map(returnedData => {
        this.actions = returnedData
      })).subscribe()



  }

}
