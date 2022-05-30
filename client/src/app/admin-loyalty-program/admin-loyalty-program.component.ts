import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoyaltyProgram } from '../dto/LoyaltyProgram';
import { AdminLoyaltyProgramService } from './service/admin-loyalty-program.service';

@Component({
  selector: 'app-admin-loyalty-program',
  templateUrl: './admin-loyalty-program.component.html',
  styleUrls: ['./admin-loyalty-program.component.css']
})
export class AdminLoyaltyProgramComponent implements OnInit {

  allLoyaltyPrograms  : LoyaltyProgram[] = new Array();
  constructor(private adminLoyaltyService:AdminLoyaltyProgramService,
              private router:Router) { }

  ngOnInit(): void {
    const headers = { 'content-type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
     let options = { headers: headers };

    this.adminLoyaltyService.getAllLoyaltyPrograms(options).subscribe(data=>{
      this.allLoyaltyPrograms = Object.assign(data);
      console.log(this.allLoyaltyPrograms);
    })
  }

}
