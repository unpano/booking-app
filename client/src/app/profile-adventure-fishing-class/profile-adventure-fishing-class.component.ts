import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Adventure } from '../dto/Adventure';
import { AdventureImage } from '../dto/AdventureImage';
import { User } from '../dto/user';
import { ProfileAdventureService } from './service/profile-adventure.service';


@Component({
  selector: 'app-profile-adventure-fishing-class',
  templateUrl: './profile-adventure-fishing-class.component.html',
  styleUrls: ['./profile-adventure-fishing-class.component.css']
})
export class ProfileAdventureFishingClassComponent implements OnInit {

  public adventure !: Adventure;
  adventureId !: Number;

  adventureImages : AdventureImage[] = new Array();

  imgCollection :  Array<object> = [];

  instructor : User = new User();

 // adventureImagesAngular = adven

  constructor(private router:Router,
    private activeRoute: ActivatedRoute,
    private profileAdventureService: ProfileAdventureService) { }

  ngOnInit(): void {
    this.adventureId = this.activeRoute.snapshot.params['id'];
   // console.log(this.adventureId); 
    this.profileAdventureService.getOneAdventure(this.adventureId).subscribe(data=>{
      this.adventure = data;
    })

    this.profileAdventureService.getAdventurePictures(this.adventureId).subscribe(data=>{
      this.adventureImages = data;
      console.log(this.adventureImages);

      
       this.adventureImages.forEach(image => {
        let obj = {
          image: 'assets/adventure-pictures/' + image.path,
          thumbImage: 'assets/adventure-pictures/'+ image.path
        }
        this.imgCollection.push(obj)
      });

     
    })

    this.profileAdventureService.getInstructorByEmail().subscribe(data=>{
      this.instructor = data;
      console.log(this.instructor);
    })

  }

  editAdventure(adventureId: Number){
      console.log(adventureId);
      this.router.navigate(['edit-profile-adventure',adventureId]);
  }

  checkFunction(){
    console.log(this.adventure);
  }

  newAction(adventureId:Number){
    this.router.navigate(['new-action-adventure/',adventureId]);
  }





}
