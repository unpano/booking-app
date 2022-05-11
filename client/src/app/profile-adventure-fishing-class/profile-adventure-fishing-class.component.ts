import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdditionalAdvService } from '../dto/AdditionalAdvService';
import { Adventure } from '../dto/Adventure';
import { AdventureImage } from '../dto/AdventureImage';
import { AdventureReservation } from '../dto/AdventureReservation';
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

  adventureActions : AdventureReservation[] = new Array();

  adventureAddServices : AdditionalAdvService[] = new Array();
  
  adventureAddServicesALL  = []; 

  isAActionReserved !: Boolean;

  searchText !: any;


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


    this.profileAdventureService.getAdventureReservations(this.adventureId).subscribe(data=>{
      this.adventureActions = data;
      

      
          this.adventureActions.forEach(element => {
              this.profileAdventureService.getAdventureAdditionalServices(element.id).subscribe(data=>{
                element.additionalAdvServices = new Array(); 
                var addServices = data;
                addServices.forEach(oneAddService => {
                  element.additionalAdvServices.push(oneAddService.name);
                });
                
                
                  //console.log();
                })
       });
     console.log(this.adventureActions);
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

  deleteAction(adventureActionId: Number){
    
      console.log(adventureActionId);  
      if(window.confirm("You want to delete termin for action?")){
          this.profileAdventureService.deleteActionForAdventure(adventureActionId).subscribe();
          window.setInterval('document.location.reload()', 1000);
         // document.location.reload();
          } else{
           window.close();
         }
       
  
  }

  editAction(adventureActionId:Number){
  
      this.router.navigate(['edit-action-adventure/',adventureActionId]);
    

  }



}
