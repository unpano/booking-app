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

  
  ngOnInit(): void {
    this.getAllAdventures();
 

  }

  getAllAdventures(){
    this.homeInstructorService.getAllAdventures().subscribe(data=>{
      this.adventures = data;
    });
  }

  addAdventure(){
    this.router.navigate(['new-adventure-fishing']);
  }


  viewAdventure(){
      this.homeInstructorService.getOneAdventure(1).subscribe(data=>{
       // console.log(data);
        this.adventureId = data.id;
        //console.log(this.adventureId); 

        this.router.navigate(['profile-adventure-fishing-class',this.adventureId]);
      })
     
      
    
  }

}
