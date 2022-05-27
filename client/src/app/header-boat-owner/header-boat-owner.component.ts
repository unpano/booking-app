import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../dto/user';
import { HeaderBoatOwnerService } from './service/header-boat-owner.service';

@Component({
  selector: 'app-header-boat-owner',
  templateUrl: './header-boat-owner.component.html',
  styleUrls: ['./header-boat-owner.component.css']
})
export class HeaderBoatOwnerComponent implements OnInit {

  boatOwnerInfo : User = new User();
  constructor(private router: Router,
              private headerBoatOwnerService: HeaderBoatOwnerService) { }

  ngOnInit(): void {
    const headers = { 'content-type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
        let options = { headers: headers };

    this.headerBoatOwnerService.getBoatOwner(options).subscribe(data=>{
      this.boatOwnerInfo = Object.assign(data);
      console.log(this.boatOwnerInfo);
    })
  }

  deleteAccount(boatOwnerEmail: String){
    this.router.navigate(['deleting-requests/userEmail/'+boatOwnerEmail]);

  }

  logOut(){
    sessionStorage.clear()
    this.router.navigate([''])
    
  }


}
