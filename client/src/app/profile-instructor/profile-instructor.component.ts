import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../dto/user';
import { ProfileInstructorService } from './service/profile-instructor.service';

@Component({
  selector: 'app-profile-instructor',
  templateUrl: './profile-instructor.component.html',
  styleUrls: ['./profile-instructor.component.css']
})
export class ProfileInstructorComponent implements OnInit {

  instructor : User = new User();

  constructor(private profileInstructorService: ProfileInstructorService,
              private router: Router) { }

  ngOnInit(): void {
    this.profileInstructorService.getInstructorByEmail().subscribe(data=>{
      this.instructor = data;
      
    })
  }

  editProfileInstructor(instructorId: Number){
      this.router.navigate(['edit-profile-instructor/',instructorId]);
  }

  changePassword(instructorId: Number){
     this.router.navigate(['edit-instructor-password/',instructorId]);
  }

}
