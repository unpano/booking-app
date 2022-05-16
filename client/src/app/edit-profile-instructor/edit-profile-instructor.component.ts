import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InstructorAvailablePeriod } from '../dto/InstructorAvailablePeriod';
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

  pickPeriod : FormGroup = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });;

  minDate = new Date;

  newPeriodAvailability : InstructorAvailablePeriod = new InstructorAvailablePeriod();

  constructor(private activeRoute:ActivatedRoute,
              private router:Router,
              private editProfileInstructorService: EditProfileInstructorService) {
                const today = new Date();
      const month = today.getMonth();
      const year = today.getFullYear();


               }

  ngOnInit(): void {
      this.instructorId = this.activeRoute.snapshot.params['id'];
      console.log(this.instructorId);

      const headers = { 'content-type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
        let options = { headers: headers };

      this.editProfileInstructorService.getAvailabilityPeriod(this.instructorId,options).subscribe(data=>{
              this.newPeriodAvailability = Object.assign(data);
      });

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
        this.newPeriodAvailability.instructorId = this.instructorId;
        console.log(this.newPeriodAvailability.instructorId);    
        console.log(this.newPeriodAvailability.startTimeAvailable);
        console.log(this.newPeriodAvailability.endTimeAvailable);
        this.editProfileInstructorService.changeAvailabilityPeriod(this.newPeriodAvailability,options).subscribe();
        
        console.log(options);
      this.editProfileInstructorService.changeInstructor(this.instructor,this.instructorId,options).subscribe();
      //alert("You changed profile info!");
      this.router.navigate(['profile-instructor/',this.instructorId]);
      
  }


}
