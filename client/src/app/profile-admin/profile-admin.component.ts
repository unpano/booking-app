import { Component, OnInit } from '@angular/core';
import { User } from '../dto/user';
import { ProfileAdminService } from './service/profile-admin.service';

@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.component.html',
  styleUrls: ['./profile-admin.component.css']
})
export class ProfileAdminComponent implements OnInit {

  editProfileVar : Boolean = false;
  admin : User = new User();
  constructor(private profileAdminService:ProfileAdminService) { }

  ngOnInit(): void {
    const headers = { 'content-type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };
    
    this.profileAdminService.getOneAdmin(options).subscribe(data=>{
      this.admin = Object.assign(data);
      console.log(this.admin);
    })
  
  }

  editProfile(){
    this.editProfileVar = true;
    
  }

  saveChanges(){
    const headers = { 'content-type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };

    this.profileAdminService.saveAdminChanges(this.admin,options).subscribe(data=>{
      this.editProfileVar = false;
      document.location.reload();
    })
    console.log(this.admin);
  }

  cancel(){
    this.editProfileVar = false;
  }

}
