import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Endpoint } from '../util/endpoints-enum';

@Component({
  selector: 'app-new-reservation',
  templateUrl: './new-reservation.component.html',
  styleUrls: ['./new-reservation.component.css']
})
export class NewReservationComponent implements OnInit {

  username !: String
  pickPeriod !: FormGroup;
  endpoint = Endpoint

  constructor(private router: Router, private http: HttpClient) { 
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    this.pickPeriod = new FormGroup({
      start: new FormControl(new Date(year, month, 11)),
      end: new FormControl(new Date(year, month, 15)),
    });
  }

  ngOnInit(): void {
  }

  reserve(){
    
  }

  //na submit

  //isAction = false
  //if Role == CottageOwner then reservationType = COTTAGE
  //startTime i endTime
  //clientUsername
  //clickedCottage je entityId


  //u new action komponenti
  
  //isAction = true
  //if Role == CottageOwner then reservationType = COTTAGE
  //startTime i endTime
  //ne setuje se username, posalji null
  //clickedCottage je entityId

}
