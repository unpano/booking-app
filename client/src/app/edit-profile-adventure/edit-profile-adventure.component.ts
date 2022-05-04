import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Adventure } from '../dto/Adventure';
import { AdventureImage } from '../dto/AdventureImage';
import { User } from '../dto/user';
import { Endpoint } from '../util/endpoints-enum';
import { EditProfileAdventureService } from './service/edit-profile-adventure.service';


class RulesBehaviorLocal{
  id !: number;
  name !: string;
  isSelected !: boolean;
}

class EquipmentLocal{
  id !: number;
  name !: string;
  isSelected !: boolean;
}

@Component({
  selector: 'app-edit-profile-adventure',
  templateUrl: './edit-profile-adventure.component.html',
  styleUrls: ['./edit-profile-adventure.component.css']
})




export class EditProfileAdventureComponent implements OnInit {

  public adventure !: Adventure;
  adventureId !: Number;

  adventureImages : AdventureImage[] = new Array();

  endpoint = Endpoint;

  instructor : User = new User();


  
  forShowingImages: string[] = [];

  imgCollection: Array<object> = [];

  oldImages: File[] = new Array();
  oldImagesFileList !: FileList;

  selectedImages : File[] = new Array();


 

  allRules : RulesBehaviorLocal[] = [
    {id: 1,name:"NO_SMOKING",isSelected:false},
    {id: 2,name:"PET_FRIENDLY",isSelected:false},
    {id: 3,name:"NO_LOUD",isSelected:false},
    {id: 4,name:"NO_PARTIES",isSelected:false}
  ];

  allEquipment: EquipmentLocal[] =[
    {id: 1,name:"REELS",isSelected:false},
    {id: 2,name:"LURES",isSelected:false},
    {id: 3,name:"NETS",isSelected:false},
    {id: 4,name:"RODS",isSelected:false},
    {id: 5,name:"SUNGLASSES",isSelected:false},
    {id: 6,name:"PROTECTION",isSelected:false}
  ]; 

  picturesAdded !: Boolean;

  constructor(private router: Router,
    private activeRoute: ActivatedRoute,
    private editAdventureService: EditProfileAdventureService,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.adventureId = this.activeRoute.snapshot.params['id'];
    console.log(this.adventureId);

    
 
    this.editAdventureService.getOneAdventure(this.adventureId).subscribe(data=>{
      this.adventure = data;

      //---------------------------------------
     this.allRules.forEach(ruleLocal => {
       this.adventure.rules.forEach(ruleDB => {
         if(ruleLocal.name == ruleDB){
           ruleLocal.isSelected = true;
         }
         
       });
       
     });
     //-----------------------------------------

     this.allEquipment.forEach(equipmentLocal => {
        this.adventure.equipment.forEach(equipmentDB => {
          if(equipmentLocal.name == equipmentDB){
            equipmentLocal.isSelected = true;
          }
          
        });
       
     });


     // console.log(this.adventure.rules);
     // console.log(this.adventure.equipment);
      
    });
    
   

    this.editAdventureService.getAdventurePictures(this.adventureId).subscribe(data=>{
      this.adventureImages = data;
      console.log(this.adventureImages);


       this.adventureImages.forEach(image => {
        

        let obj = {
          image: 'assets/adventure-pictures/' + image.path,
          thumbImage: 'assets/adventure-pictures/'+ image.path
        }
        this.imgCollection.push(obj)
      });

     

    //  console.log(this.selectedImages);
     
    })

    this.editAdventureService.getInstructorByEmail().subscribe(data=>{
      this.instructor = data;
      console.log(this.instructor);
    });

     
   
  }



  
  popFunction(){

    this.forShowingImages.pop();
    

    this.selectedImages.pop();
    //this.uploadImages.;
    console.log(this.selectedImages);
    if(this.forShowingImages.length==0)
      this.picturesAdded = false;
    console.log(this.adventure);
  }

  showRules(){

  }
  

  public onFileChanged(event: any) : void {
    
    

    var added_picture_name = document.getElementById('input-image');
    this.selectedImages.push(event.target.files[0]);
    
  
    this.forShowingImages = [];

    if(this.selectedImages.length>0){
      this.picturesAdded = true;
    } else {
      
      this.picturesAdded = false;
    }
  
      const numberOfFiles = this.selectedImages.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
  
        reader.onload = (e: any) => {
          this.forShowingImages.push(e.target.result);
        };
  
        reader.readAsDataURL(this.selectedImages[i]);
          
       
    }

    const formData: FormData = new FormData();
    

    console.log(this.selectedImages);
    //console.log(this.forShowingImages);
   
   
  }




  updateFiles(id:Number): void {
    var formData: FormData = new FormData();
    
      //console.log(this.selectedImages);
     

      if(this.selectedImages.length>0){
      
      console.log(this.selectedImages);
      for(let i=0;i<this.selectedImages.length;i++){
        
        formData.set('file', this.selectedImages[i]);
        const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem("token")};  
        let options = { headers: headers };
        this.http.post<any>(this.endpoint.UPLOAD + "add-adventure-picture/" + `${id}`, formData, options)
      .subscribe();

      }
      
      
      for (let i = 0; i < this.adventureImages.length; i++) {
        
        const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem("token")};  
        let options = { headers: headers };
        this.http.delete<any>(this.endpoint.UPLOAD + "delete-adventure-picture/" + `${this.adventureImages[i].id}`, options)
      .subscribe();


      } 
    

  } else{
    return;
  }
      

      
    
  }


  saveChanges(allRules: RulesBehaviorLocal[],allEquipment: EquipmentLocal[]){
    console.log(allRules);
    console.log(allEquipment);
    this.adventure.rules = new Array();
    this.adventure.equipment = new Array();

    allRules.forEach(rule => {
      if(rule.isSelected){
        this.adventure.rules.push(rule.name);
      }
      
    });

    allEquipment.forEach(equipment => {
      if(equipment.isSelected){
        this.adventure.equipment.push(equipment.name);
      }
      
    });


   // console.log(this.adventure.rules);
   // console.log(this.adventure.equipment);

    this.updateFiles(this.adventureId);
    this.editAdventureService.changeAdventure(this.adventure).subscribe();
    this.router.navigate(['profile-adventure-fishing-class/',this.adventure.id]);
  }



}