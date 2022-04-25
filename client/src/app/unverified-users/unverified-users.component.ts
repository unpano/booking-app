import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../dto/user';
import { UnverifUsersService } from './service/unverif-users.service';

@Component({
  selector: 'app-unverified-users',
  templateUrl: './unverified-users.component.html',
  styleUrls: ['./unverified-users.component.css']
})
export class UnverifiedUsersComponent implements OnInit {

  usersNonVerif !: User[];

  constructor(private unverifUsersService: UnverifUsersService,
    private router:Router) { }

  ngOnInit(): void {
    this.getNonVerifUsers();
  }

  private getNonVerifUsers(){
    this.unverifUsersService.getNonVerifUsers().subscribe(data=>{
      this.usersNonVerif = data;
    })

  }

}
