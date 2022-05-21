import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { InstructorAvailablePeriod } from '../dto/InstructorAvailablePeriod';
import { User } from '../dto/user';
import { ProfileInstructorService } from './service/profile-instructor.service';

@Component({
  selector: 'app-profile-instructor',
  templateUrl: './profile-instructor.component.html',
  styleUrls: ['./profile-instructor.component.css']
})
export class ProfileInstructorComponent implements OnInit {

  instructor : User = new User();


  pickPeriod : FormGroup = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });;

  minDate = new Date;

  newPeriodAvailability : InstructorAvailablePeriod = new InstructorAvailablePeriod();

  constructor(private profileInstructorService: ProfileInstructorService,
              private router: Router) { 
                const today = new Date();
                const month = today.getMonth();
                const year = today.getFullYear();


              }

  ngOnInit(): void {
    this.profileInstructorService.getInstructorByEmail().subscribe(data=>{
      this.instructor = data;
      
    


    const headers = { 'content-type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };

    this.profileInstructorService.getAvailabilityPeriod(this.instructor.id,options).subscribe(data=>{
        this.newPeriodAvailability = Object.assign(data);
    });

})
  }

  editProfileInstructor(instructorId: Number){
      this.router.navigate(['edit-profile-instructor/',instructorId]);
  }

  changePassword(instructorId: Number){
     this.router.navigate(['edit-instructor-password/',instructorId]);
  }

}
