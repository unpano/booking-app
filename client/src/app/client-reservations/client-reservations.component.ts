import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionClientReserved } from '../dto/ActionClientReserved';
import { AdventureReservation } from '../dto/AdventureReservation';
import { Instructor } from '../dto/Instructor';
import { User } from '../dto/user';
import { ClientReservationsService } from './service/client-reservations.service';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Adventure } from '../dto/Adventure';
import { AdventureSubscriber } from '../dto/AdventureSubscriber';

@Component({
  selector: 'app-client-reservations',
  templateUrl: './client-reservations.component.html',
  styleUrls: ['./client-reservations.component.css']
})
export class ClientReservationsComponent implements OnInit {

  allActions : AdventureReservation[] = new Array();

  allBookedActions : AdventureReservation[] = new Array();

  client : User = new User();
  clientId !: Number;

  allInstructorsForRevision : Instructor[] = new Array();
  allInstructorsForComplaint : Instructor[]= new Array();

  adventuresWithActions: Adventure[] = new Array();

  searchText !: any;

  subscription : AdventureSubscriber = new AdventureSubscriber();

  constructor(private router: Router,
              private activeRoute: ActivatedRoute,
              private clientReservationService: ClientReservationsService) { }

  ngOnInit(): void {
    const headers = { 'content-type': 'application/json',
                      'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };

    this.clientReservationService.getClient().subscribe(data=>{
      this.client = data;
      this.clientId = this.client.id;
    

      console.log(this.clientId);

      this.clientReservationService.getAllBookedActionsForClient(this.clientId,options).subscribe(data=>{
      this.allBookedActions = Object.assign(data);
      console.log(this.allBookedActions);

      this.allBookedActions.forEach(element=>{
        this.clientReservationService.getAllAddServices(element.id,options).subscribe(data=>{
           element.additionalAdvServices = new Array();
           var addBookedServices = Object.assign(data);

           addBookedServices.forEach((oneAddService: { name: String; }) => {
                element.additionalAdvServices.push(oneAddService.name);
           });
        })

        });
      
      })



      this.clientReservationService.getAllActionsForClient(this.clientId,options).subscribe(data=>{
      this.allActions = Object.assign(data);
      console.log(this.allActions);

      this.allActions.forEach(element=>{
        this.clientReservationService.getAllAddServices(element.id,options).subscribe(data=>{
           element.additionalAdvServices = new Array();
           var addServices = Object.assign(data);

           addServices.forEach((oneAddService: { name: String; }) => {
                element.additionalAdvServices.push(oneAddService.name);
           });
        })

        });
      })

      this.clientReservationService.getAllInstructorsForMarkAndRevision(this.clientId,options).subscribe(data=>{
          this.allInstructorsForRevision = Object.assign(data);
          console.log(this.allInstructorsForRevision);

          this.allInstructorsForRevision.forEach(instructor => {
              this.clientReservationService.checkIfInstructorHasRevisionFromClient(this.clientId,instructor.id,options).subscribe(data=>{
                  instructor.hasRevisionFromClient = Object.assign(data);
                  console.log(instructor.hasRevisionFromClient);
              })

              this.clientReservationService.checkIfInstructorHasComplaintFromClient(this.clientId,instructor.id,options).subscribe(data=>{
                  instructor.hasComplaint = Object.assign(data);
                  console.log(instructor.hasComplaint);
                  
              })
          
          });


      })


  

   this.clientReservationService.getAllAdventuresWithActions(options).subscribe(adventures=>{
     this.adventuresWithActions = Object.assign(adventures);

     this.adventuresWithActions.forEach(adventureWithActions => {
       this.clientReservationService.getOneInstructor(adventureWithActions.instructorId,options).subscribe(instructor=>{
        adventureWithActions.instructorInfo = Object.assign(instructor); 
        
       })

       this.clientReservationService.checkIfAdventureHasSubscription(adventureWithActions.id,this.clientId,options).subscribe(hasSubscription=>{
         adventureWithActions.hasSubscription = Object.assign(hasSubscription);
       })

     });
   })
 

  });
  }

  reserveAction(actionId:Number){
    const headers = { 'content-type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };
    var actionForReservation = new ActionClientReserved();
    actionForReservation.actionId = actionId;
    actionForReservation.clientId = this.clientId;
    
    this.clientReservationService.checkIfActionIsAlreadyBooked(actionForReservation.actionId,actionForReservation.clientId,options).subscribe(response=>{
        let isBooked = Object.assign(response);
        if(isBooked==true){
          alert("Instructor suddenly reserved this action for you,so you are unable to reserve it twice.");
        } else {
          alert("You reserved this action");
        }
    
        this.clientReservationService.reserveOneAction(actionForReservation,options).subscribe();
        
        window.setInterval('document.location.reload()', 1000);
   
      })
  }

  cancelBooking(clientId:Number,actionId:Number){
    const headers = { 'content-type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };

    if(window.confirm("You want to cancel reserving this action?")){
      this.clientReservationService.cancelBookingAction(actionId,clientId,options).subscribe();
      window.setInterval('document.location.reload()', 1000);
  } else {
    window.close();
  }

  }

  subscribeToAdventure(adventureId:Number,clientId:Number){
    const headers = { 'content-type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };


    if(window.confirm("You want to subscribe to this adventure?")){
      this.subscription.adventureId = adventureId;
      this.subscription.clientId = clientId;
      this.clientReservationService.subcribeToAdventure(this.subscription,options).subscribe();
      alert("You subscribed to this adventure!");
      window.setInterval('document.location.reload()', 1000);
    }else {
      window.close();
    }

  }

  unsubscribeFromAdventure(adventureId:Number,clientId:Number){
    const headers = { 'content-type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };


    if(window.confirm("You want to unsubcribe from this adventure?")){
      this.subscription.adventureId = adventureId;
      this.subscription.clientId = clientId;
      this.clientReservationService.unsubscribeFromAdventure(adventureId,clientId,options).subscribe();
      alert("You unsubcribed from this adventure!");
      window.setInterval('document.location.reload()', 1000);
    }else {
      window.close();
    }

  }


  viewActionDetails(actionId:Number){
    this.router.navigate(['view-action-details/',actionId]);
    
  }

  addRevisionMark(instructorId:Number,clientId:Number){
    this.router.navigate(['add-revision-mark-for-instructor/instructorId/' + instructorId + '/clientId/'+clientId]);

  }

  viewRevisionMark(instructorId:Number,clientId:Number){
    this.router.navigate(['view-revision-mark-for-instructor/instructorId/' + instructorId + '/clientId/'+clientId]);

  }

  addComplaint(clientId:Number,instructorId:Number){
    this.router.navigate(['add-complaint-for-instructor/clientId/'+ clientId + '/instructorId/'+instructorId]);
  }

  viewComplaint(clientId:Number,intsructorForRevisionId:Number){
    this.router.navigate(['client-view-complanit-for-instructor/clientId/'+ clientId + '/instructorId/'+intsructorForRevisionId]);

  }


}
