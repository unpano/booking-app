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

  adventurePastActions: AdventureReservation[] = new Array();

  adventureAddServices : AdditionalAdvService[] = new Array();

  adventureAddServicesPast: AdditionalAdvService[] = new Array();
  
  adventureAddServicesALL  = []; 

  isAActionReserved !: Boolean;

  searchText !: any;


 // adventureImagesAngular = adven

  constructor(private router:Router,
    private activeRoute: ActivatedRoute,
    private profileAdventureService: ProfileAdventureService) { }

  ngOnInit(): void {
    this.adventureId = this.activeRoute.snapshot.params['id'];
    const headers = { 'content-type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
      let options = { headers: headers };


   // console.log(this.adventureId); 
    this.profileAdventureService.getOneAdventure(this.adventureId,options).subscribe(data=>{
      this.adventure = Object.assign(data);
    })

    this.profileAdventureService.getAdventurePictures(this.adventureId,options).subscribe(data=>{
      this.adventureImages = Object.assign(data);
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


    this.profileAdventureService.getAdventureReservations(this.adventureId,options).subscribe(data=>{
      this.adventureActions = Object.assign(data);
     

      

          this.adventureActions.forEach(element => {
              this.profileAdventureService.getAdventureAdditionalServices(element.id,options).subscribe(data=>{
                element.additionalAdvServices = new Array(); 
                var addServices = Object.assign(data);
                addServices.forEach((oneAddService: { name: String; }) => {
                  element.additionalAdvServices.push(oneAddService.name);
                });
                
                
                  //console.log();
                })
       });
     console.log(this.adventureActions);
    })

    // OVO SAD ZA PROSLE AKCIJE
    this.profileAdventureService.getAdventurePastReservations(this.adventureId,options).subscribe(data=>{
        this.adventurePastActions = Object.assign(data);

          this.adventurePastActions.forEach(element=>{
                this.profileAdventureService.getAdventureAdditionalServices(element.id,options).subscribe(data=>{
                   element.additionalAdvServices = new Array();
                   var addServices = Object.assign(data);

                   addServices.forEach((oneAddService: { name: String; }) => {
                        element.additionalAdvServices.push(oneAddService.name);
                   });
                })

          });

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
          const headers = { 'content-type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
          let options = { headers: headers };
          
          this.profileAdventureService.deleteActionForAdventure(adventureActionId,options).subscribe();
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
