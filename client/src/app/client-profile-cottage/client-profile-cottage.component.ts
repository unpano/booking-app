import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { CottageReservationFormComponent } from '../cottage-reservation-form/cottage-reservation-form.component';
import { AmenityJSON } from '../dto/amenitiyJSON';
import { Client } from '../dto/client';
import { Cottage } from '../dto/cottage';
import { RuleJSON } from '../dto/RuleJSON';
import { DateFilterService } from '../util/dateFIlterService';
import { Endpoint } from '../util/endpoints-enum';
import { Global } from '../util/global';

@Component({
  selector: 'app-client-profile-cottage',
  templateUrl: './client-profile-cottage.component.html',
  styleUrls: ['./client-profile-cottage.component.css']
})
export class ClientProfileCottageComponent implements OnInit {

  name !: String
  address !: String
  city !: String
  description !: String
  maxNumPers !: Number
  oneDayPrice !: Number

  roomName !: String
  roomBadTypes !: String


  endpoint = Endpoint

  imgCollection: Array<object> = [];

  cottage:any



  amenities : AmenityJSON[] = []
  rules : RuleJSON[] = []
  
  services = Global.services
  amenities1 = Global.amenities


  role : any

  client : Client = new Client()

  starNames : String[] = []

  constructor(private router: Router,private sanitizer: DomSanitizer, private http: HttpClient, private dateService: DateFilterService, private dialog: MatDialog) { 
    
  }

  ngOnInit(): void {

    this.role = sessionStorage.getItem('role')


    const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };

    if(sessionStorage.getItem('cottageId') == undefined)
      this.router.navigate(["login"])

    this.http
        .get(this.endpoint.COTTAGES + sessionStorage.getItem('cottageId') ,options)
          .pipe(
            map(returnedCottage=> {
              this.cottage = returnedCottage              
            })).subscribe(() =>
            {
                    this.cottage.amenities.forEach((amenityInCottage: string) => 
                    {
                          var amenityJSON = this.findAmenity(amenityInCottage)
                          this.amenities.push(amenityJSON)
                    });

                
  
           
            })  


           
         
  }



  
  subscribe(cottage : Cottage)
  {
    const headers = { 'content-type': 'application/json'} 
    let options = { headers: headers };

    this.http.post<any>(this.endpoint.COTTAGE_SUBSCRIBE+ cottage.id + "/" + sessionStorage.getItem('id'), options).pipe(
      map(returnedcottage => {
        this.cottage = returnedcottage
      })).subscribe(() =>
      {
          alert( "You're subscribed on that cottage")
      })

  }
  reserve(cottage : Cottage)
  {
    const headers = { 'content-type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  

    let options = { headers: headers };

    this.http.get<any>(this.endpoint.FIND_CLIENT+ sessionStorage.getItem('id'), options).pipe(
      map(returnedUser => {
        this.client = returnedUser
      })).subscribe(  () => 
      {
        if(this.client.numOfPenalties> 3)
        {
          alert( 'You can not make reservations this month!')
        }
        else
        {
     
          sessionStorage.setItem('cottageId', cottage.id.toString())

          let dialogRef = this.dialog.open(CottageReservationFormComponent)
          dialogRef.afterClosed().subscribe();
        }

      })

 

  }

  starNamesFunc(rate: Number): String[]{
    this.starNames = []
   
    if(rate == 0){
      this.starNames.push('outline')
      this.starNames.push('outline')
      this.starNames.push('outline')
      this.starNames.push('outline')
      this.starNames.push('outline')
    
    }else if(rate > 0 && rate < 1){
      this.starNames.push('half')
      this.starNames.push('outline')
      this.starNames.push('outline')
      this.starNames.push('outline')
      this.starNames.push('outline')

    }else if(rate >= 1 && rate < 1.5){
      this.starNames.push('rate')
      this.starNames.push('outline')
      this.starNames.push('outline')
      this.starNames.push('outline')
      this.starNames.push('outline')

    }else if (rate >= 1.5 && rate < 2){
      this.starNames.push('rate')
      this.starNames.push('half')
      this.starNames.push('outline')
      this.starNames.push('outline')
      this.starNames.push('outline')

    }else if (rate >= 2 && rate < 2.5){
      this.starNames.push('rate')
      this.starNames.push('rate')
      this.starNames.push('outline')
      this.starNames.push('outline')
      this.starNames.push('outline')

    }else if (rate >= 2.5 && rate < 3){
      this.starNames.push('rate')
      this.starNames.push('rate')
      this.starNames.push('half')
      this.starNames.push('outline')
      this.starNames.push('outline')

    }else if (rate >= 3 && rate < 3.5){
      this.starNames.push('rate')
      this.starNames.push('rate')
      this.starNames.push('rate')
      this.starNames.push('outline')
      this.starNames.push('outline')
      
    }else if (rate >= 3.5 && rate < 4){
      this.starNames.push('rate')
      this.starNames.push('rate')
      this.starNames.push('rate')
      this.starNames.push('half')
      this.starNames.push('outline')

    }else if (rate >= 4 && rate < 4.5){
      this.starNames.push('rate')
      this.starNames.push('rate')
      this.starNames.push('rate')
      this.starNames.push('rate')
      this.starNames.push('outline')

    }else if (rate >= 4.5 && rate < 5){
      this.starNames.push('rate')
      this.starNames.push('rate')
      this.starNames.push('rate')
      this.starNames.push('rate')
      this.starNames.push('half')

    }else if( rate == 5){
      this.starNames.push('rate')
      this.starNames.push('rate')
      this.starNames.push('rate')
      this.starNames.push('rate')
      this.starNames.push('rate')
    }

    console.log(this.starNames)
    return this.starNames
  }

  private findAmenity(amenityName: string): AmenityJSON{
    
    var amenityJSON = new AmenityJSON()

      Global.amenities.forEach((amenity) => {
        if(amenityName == amenity.value){
          amenityJSON.name = amenity.display
          amenityJSON.icon = amenity.icon
        }
          
      })

      return amenityJSON
  }
  private findRule(ruleName: string): RuleJSON{
    
    var ruleJSON = new RuleJSON()

      Global.services.forEach((rule) => {
        if(ruleName == rule.value){
          ruleJSON.name = rule.display
          ruleJSON.icon = rule.icon
        }
          
      })

      return ruleJSON
  }


    
    

  
  
  }


