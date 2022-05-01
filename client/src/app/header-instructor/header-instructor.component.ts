import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-instructor',
  templateUrl: './header-instructor.component.html',
  styleUrls: ['./header-instructor.component.css']
})
export class HeaderInstructorComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  logOut(){
    sessionStorage.clear()
    this.router.navigate([''])
    
  }

  homePageInstructor(){
    this.router.navigate(['instructor'])
  }


  instructorProfile(){
    this.router.navigate(['profile-instructor'])
  }

}
