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

  searchText !: any;
 
  
  ngOnInit(): void {
    
    this.homeInstructorService.getInstructorInfo().subscribe(data=>{
        this.instructor = data;
        console.log(this.instructor);
        const headers = { 'content-type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
        let options = { headers: headers };


        this.homeInstructorService.getAllAdventures(this.instructor.id,options).subscribe(data=>{
          this.adventures = Object.assign(data);

          this.adventures.forEach(adventure => {
            this.homeInstructorService.changeNumOfActiveActions(adventure.id,options).subscribe();
            this.homeInstructorService.changeNumOfPastActions(adventure.id,options).subscribe();
          });
        });

    })


  }



  addAdventure(id:Number){
    this.router.navigate(['new-adventure-fishing/instructorId/',id]);
  }


  viewAdventure(adventureId: Number){
    const headers = { 'content-type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
     let options = { headers: headers };

      this.homeInstructorService.getOneAdventure(adventureId,options).subscribe(data=>{
       // console.log(data);
        var adventure = Object.assign(data);
        this.adventureId = adventure.id;
        //console.log(this.adventureId); 

        this.router.navigate(['profile-adventure-fishing-class',this.adventureId]);
      })
     
    
  }

  deleteAdventure(adventureId:Number){
    if(window.confirm("You want to delete this adventure?")){
      const headers = { 'content-type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
       let options = { headers: headers };
        console.log(options);
        this.homeInstructorService.deleteOneAdventure(adventureId,options).subscribe();
        window.setInterval('document.location.reload()', 1000);
        //document.location.reload();
    } else{
      window.close();
    }
  }

}
