import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoyaltyProgram } from '../dto/LoyaltyProgram';
import { AdminLoyaltyChangeService } from './service/admin-loyalty-change.service';

@Component({
  selector: 'app-admin-loyalty-change-program',
  templateUrl: './admin-loyalty-change-program.component.html',
  styleUrls: ['./admin-loyalty-change-program.component.css']
})
export class AdminLoyaltyChangeProgramComponent implements OnInit {

  loyaltyProgramId !: Number;
  loyaltyProgram: LoyaltyProgram = new LoyaltyProgram();
  constructor(private router:Router,
              private activeRoute:ActivatedRoute,
              private adminLoyaltyChangeService: AdminLoyaltyChangeService) { }

  ngOnInit(): void {
    const headers = { 'content-type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
     let options = { headers: headers };

    this.loyaltyProgramId = this.activeRoute.snapshot.params['loyaltyProgramId'];
    console.log(this.loyaltyProgramId);
    this.adminLoyaltyChangeService.getOneLoyaltyProgram(this.loyaltyProgramId,options).subscribe(data=>{
      this.loyaltyProgram = Object.assign(data);
    })
  }

  backToAllLoyalties(){
    this.router.navigate(['admin-loyalty-program']);

  }

  saveChanges(){
    const headers = { 'content-type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
     let options = { headers: headers };


    if(window.confirm("You want to save changes?")){
      this.adminLoyaltyChangeService.changeOneLoyaltyProgram(this.loyaltyProgram,options).subscribe();
      this.router.navigate(['admin-loyalty-program']);
    }else{
      window.close();
    }
  }


}
