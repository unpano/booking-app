import { HttpClient } from '@angular/common/http';
import { ArrayType } from '@angular/compiler';
import { newArray } from '@angular/compiler/src/util';
import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Adventure } from '../dto/Adventure';
import { RulesBehavior } from '../dto/enums/RulesBehaviour';
import { HomePageInstructorComponent } from '../home-page-instructor/home-page-instructor.component';
import { Endpoint } from '../util/endpoints-enum';
import { NewAdventureFishingService } from './service/new-adventure-fishing.service';

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
  selector: 'app-new-adventure-fishing',
  templateUrl: './new-adventure-fishing.component.html',
  styleUrls: ['./new-adventure-fishing.component.css']
})
export class NewAdventureFishingComponent implements OnInit {


  
  name !: String;
  address !: String;
  description !: String;
  maxNumOfPersons !: Number;
  

  
  roomNum !: Number;
  price !: Number;
  rate !: Number;

  
  

  rules !: RulesBehaviorLocal[];
  equipment !: EquipmentLocal[];


  
  selectedImages : File[] = new Array();
  uploadImages !: FileList;

  forShowingImages : String[] = [];
  imageName !: any;

  

  endpoint = Endpoint;
 
  adventure : Adventure = new Adventure();

  savedAdventure : Adventure = new Adventure();
  adventureId !: Number;

  
  

  constructor(private router:Router,
    private newAdventureFishingService: NewAdventureFishingService,
    private activeRoute: ActivatedRoute,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.getRules();
    this.getEquipment();
     
  }

  getRules(){
    this.rules=[
      {id: 0, name:"NO_SMOKING",isSelected:false},
      {id: 1, name: "PET_FRIENDLY",isSelected:false},
      {id: 2, name: "NO_LOUD",isSelected:false},
      {id: 3, name: "NO_PARTIES",isSelected:false}
    ];
  }

  getEquipment(){
    this.equipment=[
      {id: 0, name:"REELS",isSelected:false},
      {id: 1, name: "LURES",isSelected:false},
      {id: 2, name: "NETS",isSelected:false},
      {id: 3, name: "RODS",isSelected:false},
      {id: 4, name: "SUNGLASSES",isSelected:false},
      {id: 5, name: "PROTECTION",isSelected:false},

    ];
  }

  onChange(){
    //console.log(this.rules);
    //console.log(this.equipment);
  }

 // funkcija za prikaz odabranih slika
  public onFileChanged(event: any) : void {
    
    this.selectedImages.push(event.target.files[0]);
    
    this.uploadImages = Object.assign(this.selectedImages);
  
    
    this.forShowingImages = [];
  
      const numberOfFiles = this.selectedImages.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
  
        reader.onload = (e: any) => {
          this.forShowingImages.push(e.target.result);
        };
  
        reader.readAsDataURL(this.selectedImages[i]);
          
       
    }

    const formData: FormData = new FormData();
    

    //console.log(this.selectedImages);
    //console.log(this.forShowingImages);
    //console.log(this.uploadImages);
   
  }


 

  
      
  popFunction(){
    this.selectedImages.pop();
    this.forShowingImages.pop();
  }
  

  uploadFilesFunction(id:Number): void {
    const formData: FormData = new FormData();
    if (this.uploadImages) {
      for (let i = 0; i < this.uploadImages.length; i++) {
        formData.set('file', this.uploadImages[i]);
        formData.forEach(element => {
          console.log(element);
        });
        const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem("token")};  
        let options = { headers: headers };

        this.http.post<any>(this.endpoint.UPLOAD + "add-adventure-picture/" + `${id}`, formData, options)
          .subscribe();
      }
    }
  }


  addAdventure(){

    
     
     var adventureLocal = new Adventure();
    this.adventure.name = this.name;
   // console.log(this.adventure.name);

    this.adventure.address = this.address;
    //console.log(this.adventure.address);

    this.adventure.description = this.description;
    this.adventure.maxNumOfPersons = this.maxNumOfPersons;
    this.adventure.price = this.price;
    this.adventure.rules = new Array();
    this.adventure.equipment = new Array();
    

    this.rules.forEach(rule => {
      if(rule.isSelected){
        if(rule.name=="NO_SMOKING"){
        this.adventure.rules.push("NO_SMOKING");
      }else if(rule.name=="PET_FRIENDLY"){
        this.adventure.rules.push("PET_FRIENDLY");
      } else if(rule.name=="NO_LOUD"){
        this.adventure.rules.push("NO_LOUD");

      } else{
        this.adventure.rules.push("NO_PARTIES");
      }
    
    }
  
    });

    this.equipment.forEach(equip=>{
        if(equip.isSelected){
          if(equip.name=="REELS"){
            this.adventure.equipment.push("REELS");
          } else if(equip.name=="LURES"){
            this.adventure.equipment.push("LURES");
          } else if(equip.name=="NETS"){
            this.adventure.equipment.push("NETS");
          } else if(equip.name=="RODS"){
            this.adventure.equipment.push("RODS");
          } else if(equip.name=="SUNGLASSES"){
            this.adventure.equipment.push("SUNGLASSES");
          }  else {
            this.adventure.equipment.push("PROTECTION");
          }
        }


    });  

   // console.log(this.adventure.rules);
  //  console.log(this.adventure.equipment);
  
  
  console.log(this.adventure);
  
  
   this.newAdventureFishingService.addAdventure(this.adventure).subscribe(data=>{
     //console.log(data);
     this.savedAdventure = Object.assign(data);
      console.log(this.savedAdventure);
      this.adventureId = this.savedAdventure.id;

      console.log(this.adventureId);

      

      this.uploadFilesFunction(this.adventureId);
     //this.popFunction();
     
      this.router.navigate(['instructor']);
    });
    
   
  }
  


  

  


  

}