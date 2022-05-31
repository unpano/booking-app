import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../dto/user';
import { HeaderInstructorService } from './service/header-instructor.service';

@Component({
  selector: 'app-header-instructor',
  templateUrl: './header-instructor.component.html',
  styleUrls: ['./header-instructor.component.css']
})
export class HeaderInstructorComponent implements OnInit {

  instructorInfo : User = new User();
  constructor(private router:Router,
              private headerInstructorService:HeaderInstructorService) { }

  ngOnInit(): void {
    const headers = { 'content-type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };

    this.headerInstructorService.getInstructorInfo(options).subscribe(data=>{
      this.instructorInfo = Object.assign(data);
    })
  }

  deleteAccount(instructorEmail:String){
    this.router.navigate(['deleting-requests/userEmail/'+instructorEmail]);
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

  calendarBooking(){
    this.router.navigate(['calendar-booking-instructor']);
  }

}
