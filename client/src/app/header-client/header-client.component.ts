import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../dto/user';
import { HeaderClientService } from './service/header-client.service';

@Component({
  selector: 'app-header-client',
  templateUrl: './header-client.component.html',
  styleUrls: ['./header-client.component.css']
})
export class HeaderClientComponent implements OnInit {


  clientInfo : User = new User();
  constructor(private router: Router,
              private headerClientService: HeaderClientService) { }

  ngOnInit(): void {
    const headers = { 'content-type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
        let options = { headers: headers };

    this.headerClientService.getClientInfo(options).subscribe(data=>{
      this.clientInfo = Object.assign(data);
    })
  }

  deleteAccount(clientInfoEmail:String){
      this.router.navigate(['deleting-requests/userEmail/'+clientInfoEmail]);
  }



  logOut(){
    sessionStorage.clear()
    this.router.navigate([''])
    
  }

}
