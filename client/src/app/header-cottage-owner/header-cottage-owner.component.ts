import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../dto/user';
import { HeaderCottageOwnerService } from './service/header-cottage-owner.service';

@Component({
  selector: 'app-header-cottage-owner',
  templateUrl: './header-cottage-owner.component.html',
  styleUrls: ['./header-cottage-owner.component.css']
})
export class HeaderCottageOwnerComponent implements OnInit {

  cottageOwnerInfo : User = new User();
  constructor(private router: Router,
              private headerCottageOwnerService:HeaderCottageOwnerService) { }

  ngOnInit(): void {
    const headers = { 'content-type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };

    this.headerCottageOwnerService.getCottageOwner(options).subscribe(data=>{
      this.cottageOwnerInfo = Object.assign(data);
    })
  }

  deleteAccount(cottageOwnerEmail: String){
    this.router.navigate(['deleting-requests/userEmail/'+cottageOwnerEmail]);
  }

  logOut(){
    sessionStorage.clear()
    this.router.navigate([''])
    
  }

  

}
