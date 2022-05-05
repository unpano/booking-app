import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Adventure } from '../dto/Adventure';
import { User } from '../dto/user';
import { HomePageInstructorService } from './service/home-page-instructor.service';

@Component({
  selector: 'app-home-page-instructor',
  templateUrl: './home-page-instructor.component.html',
  styleUrls: ['./home-page-instructor.component.css']
})
export class HomePageInstructorComponent implements OnInit {

  constructor(private router:Router,
    private activeRoute : ActivatedRoute,
    private homeInstructorService: HomePageInstructorService) { }


  
  
  adventures !: Adventure[];

  adventureId !: Number;

  instructor: User = new User();
 
  
  ngOnInit(): void {
    
    this.homeInstructorService.getInstructorInfo().subscribe(data=>{
        this.instructor = data;
        console.log(this.instructor);
        this.homeInstructorService.getAllAdventures(this.instructor.id).subscribe(data=>{
          this.adventures = data;
        });

    })


  }



  addAdventure(id:Number){
    this.router.navigate(['new-adventure-fishing/instructorId/',id]);
  }


  viewAdventure(adventureId: Number){
      this.homeInstructorService.getOneAdventure(adventureId).subscribe(data=>{
       // console.log(data);
        this.adventureId = data.id;
        //console.log(this.adventureId); 

        this.router.navigate(['profile-adventure-fishing-class',this.adventureId]);
      })
     
      
    
  }

}
