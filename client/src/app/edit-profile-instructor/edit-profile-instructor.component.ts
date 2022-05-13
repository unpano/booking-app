import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../dto/user';
import { EditProfileInstructorService } from './service/edit-profile-instructor.service';

@Component({
  selector: 'app-edit-profile-instructor',
  templateUrl: './edit-profile-instructor.component.html',
  styleUrls: ['./edit-profile-instructor.component.css']
})
export class EditProfileInstructorComponent implements OnInit {

  instructorId !: Number;
  instructor : User = new User();
  constructor(private activeRoute:ActivatedRoute,
              private router:Router,
              private editProfileInstructorService: EditProfileInstructorService) { }

  ngOnInit(): void {
      this.instructorId = this.activeRoute.snapshot.params['id'];
      console.log(this.instructorId);

      this.editProfileInstructorService.getInstructor(this.instructorId).subscribe(data=>{
            this.instructor = data;
            console.log(this.instructor);
      })
      
  }

  cancel(){
      this.router.navigate(['profile-instructor/',this.instructorId]);
  }

  saveChanges(){
      console.log(this.instructor);

      const headers = { 'content-type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
        let options = { headers: headers };
        console.log(options);
      this.editProfileInstructorService.changeInstructor(this.instructor,this.instructorId,options).subscribe();
      //alert("You changed profile info!");
      this.router.navigate(['profile-instructor/',this.instructorId]);
      
  }
}
