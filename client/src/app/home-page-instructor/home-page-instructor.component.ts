import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Adventure } from '../dto/Adventure';
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

  instructorMail !: String;
  adventures !: Adventure[];
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



  public sendInstructorEmail(): String{
    this.instructorMail = this.activeRoute.snapshot.params['email'];
    return this.instructorMail;
  }

}
