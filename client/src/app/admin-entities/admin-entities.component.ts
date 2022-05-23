import { Component, OnInit } from '@angular/core';
import { BoatOwner } from '../dto/BoatOwner';
import { Cottage } from '../dto/cottage';
import { CottageOwner } from '../dto/CottageOwner';
import { AdminEntitiesService } from './service/admin-entities.service';
import { Boat } from '../dto/boat';
import { Instructor } from '../dto/Instructor';
import { Client } from '../dto/Client';

@Component({
  selector: 'app-admin-entities',
  templateUrl: './admin-entities.component.html',
  styleUrls: ['./admin-entities.component.css']
})
export class AdminEntitiesComponent implements OnInit {

  cottageOwners : CottageOwner[] = new Array();
  cottages : Cottage[] = new Array();
  boatOwners : BoatOwner[] = new Array();
  boats : Boat[] = new Array();
  instructors : Instructor[] = new Array();
  clients : Client[] = new Array();
  constructor(private adminEntitiesService: AdminEntitiesService) { }

  ngOnInit(): void {
    const headers = { 'content-type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
     let options = { headers: headers };
    
     this.adminEntitiesService.getAllCottageOwners(options).subscribe(data=>{
       this.cottageOwners = Object.assign(data);
     })

     this.adminEntitiesService.getAllCottages(options).subscribe(data=>{
       this.cottages = Object.assign(data);
     })

     this.adminEntitiesService.getAllBoatOwners(options).subscribe(data=>{
       this.boatOwners = Object.assign(data);
     })

     this.adminEntitiesService.getAllBoats(options).subscribe(data=>{
       this.boats = Object.assign(data);
     })

     this.adminEntitiesService.getAllInstructors(options).subscribe(data=>{
       this.instructors = Object.assign(data);
     })

     this.adminEntitiesService.getAllClients(options).subscribe(data=>{
       this.clients = Object.assign(data);
     })

  }

  deleteCottageOwner(cottageOwnerId:Number){
    
    if(window.confirm("You want to delete this cottage owner?")){
    const headers = { 'content-type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
     let options = { headers: headers };

    this.adminEntitiesService.deleteCottageOwner(cottageOwnerId,options).subscribe();

    alert("Cottage owner is deleted!");

    window.setInterval('document.location.reload()', 1000);
  } else{
    window.close();
  }

  }


  deleteCottage(cottageId:Number){
    if(window.confirm("You want to delete this cottage?")){
      const headers = { 'content-type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
       let options = { headers: headers };

       
       this.adminEntitiesService.deleteCottage(cottageId,options).subscribe();
       alert("You deleted this cottage!");
       window.setInterval('document.location.reload()', 1000);

    } else{
      window.close();
    }
  }

  deleteBoatOwner(boatOwnerId:Number){
    if(window.confirm("You want to delete this boat owner?")){
      const headers = { 'content-type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
       let options = { headers: headers };

       this.adminEntitiesService.deleteBoatOwner(boatOwnerId,options).subscribe();
       alert("You deleted this boat owner!");
       window.setInterval('document.location.reload()', 1000);

    } else {
      window.close();
    }

  }

  deleteBoat(boatId:Number){
    if(window.confirm("You want to delete this boat?")){
      const headers = { 'content-type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
       let options = { headers: headers };

       this.adminEntitiesService.deleteBoat(boatId,options).subscribe();
       alert("You deleted this boat!");
       window.setInterval('document.location.reload()', 1000);

    } else {
      window.close();
    }
  }

  deleteInstructor(instructorId:Number){
    if(window.confirm("You want to delete this instructor?")){
      const headers = { 'content-type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
       let options = { headers: headers };

       this.adminEntitiesService.deleteInstructor(instructorId,options).subscribe();
       alert("You deleted this instructor!");
       window.setInterval('document.location.reload()', 1000);

    } else {
      window.close();
    }
  }

  deleteClient(clientId:Number){
    if(window.confirm("You want to delete this client?")){
      const headers = { 'content-type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
       let options = { headers: headers };

       this.adminEntitiesService.deleteClient(clientId,options).subscribe();
       alert("You deleted this client!");
       window.setInterval('document.location.reload()', 1000);

    } else {
      window.close();
    }

  }


}
