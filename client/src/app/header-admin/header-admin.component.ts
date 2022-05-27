import { I } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../dto/user';
import { HeaderAdminService } from './service/header-admin.service';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent implements OnInit {

  firstAdmin : Boolean = false;
  changedPasswordOtherAdmin : Boolean = false;
  otherAdmin : Boolean = false;

  adminInfo : User = new User();

  constructor(private router:Router,
              private headerAdminService:HeaderAdminService) { }

  ngOnInit(): void {
    const headers = { 'content-type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
        let options = { headers: headers };

    this.headerAdminService.getAdmin(options).subscribe(data=>{
      this.adminInfo = Object.assign(data);
      console.log(this.adminInfo);
    })

    this.headerAdminService.checkIfAdminIsOther(options).subscribe(data=>{
        this.otherAdmin = Object.assign(data);
        console.log(this.otherAdmin);
        if(this.otherAdmin==false){
          this.firstAdmin = true;
        } else{
          this.firstAdmin = false;
        }

        if(this.otherAdmin==true){
          this.headerAdminService.checkIfOtherAdminChangedPassword(options).subscribe(data=>{
              this.changedPasswordOtherAdmin = Object.assign(data);
              console.log(this.changedPasswordOtherAdmin);
          })
       }

    })

   

    
  }
  homePageAdmin(){
    this.router.navigate(['admin'])
  }

  adminProfile(){
    this.router.navigate(['profile-admin'])  
  }

 

  unverifiedUsers(){
      this.router.navigate(['unverified-users'])
  }

  verifiedUsers(){
      this.router.navigate(['verified-users']);
  }

  clientsPenalties(){
    this.router.navigate(['admin-punish-clients']);
  }

  addNewAdmin(){
    this.router.navigate(['add-new-admin']);
  }

  adminEntities(){
    this.router.navigate(['admin-entities']);
  }

  incomesActions(){
    this.router.navigate(['admin-income-reservations']);
  }

  marksReviewsFromClients(){
    this.router.navigate(['all-revisions-marks-for-instructor']);
  }

  adminRequestsDeletingAccount(){
    this.router.navigate(['admin-requests-deleting-account']);
  }

  deleteAccount(adminEmail:String){
    this.router.navigate(['deleting-requests/userEmail/'+adminEmail]);

  }

  logOut(){
    sessionStorage.clear()
    this.router.navigate(['']);
    
  }

}
