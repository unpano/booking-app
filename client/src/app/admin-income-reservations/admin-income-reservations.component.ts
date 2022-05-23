import { Component, OnInit } from '@angular/core';
import { IncomeReservation } from '../dto/IncomeReservation';
import { AdminIncomeReservationsService } from './service/admin-income-reservations.service';

@Component({
  selector: 'app-admin-income-reservations',
  templateUrl: './admin-income-reservations.component.html',
  styleUrls: ['./admin-income-reservations.component.css']
})
export class AdminIncomeReservationsComponent implements OnInit {

  incomesReservations : IncomeReservation[] = new Array();
  constructor(private adminIncomeReservationService:AdminIncomeReservationsService) { }

  ngOnInit(): void {
    const headers = { 'content-type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
     let options = { headers: headers };

     this.adminIncomeReservationService.getAllIncomesForBookedActions(options).subscribe(data=>{
       this.incomesReservations = Object.assign(data);
     })
    
  }

}
