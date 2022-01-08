import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AmenityJSON } from '../dto/amenitiyJSON';
import { RuleJSON } from '../dto/RuleJSON';
import { Endpoint } from '../util/endpoints-enum';
import { Global } from '../util/global';

@Component({
  selector: 'app-profile-cottage',
  templateUrl: './profile-cottage.component.html',
  styleUrls: ['./profile-cottage.component.css']
})
export class ProfileCottageComponent implements OnInit {

  imgCollection: Array<object> = [];

  endpoint = Endpoint
  cottage:any

  amenities : AmenityJSON[] = []
  rules : RuleJSON[] = []

  constructor(private router: Router,private sanitizer: DomSanitizer, private http: HttpClient) { 
    
  }

  ngOnInit(): void {

    //cottage details
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
              this.cottage.amenities.forEach((amenityInCottage: string) => {
                    var amenityJSON = this.findAmenity(amenityInCottage)
                    this.amenities.push(amenityJSON)
              });

              this.cottage.additionalServices.forEach((rule: string) => {
                var ruleJSON = this.findRule(rule)
                this.rules.push(ruleJSON)
          });
              
              //cottage images in imgCollection
              this.http
                  .get(this.endpoint.COTTAGES + sessionStorage.getItem('cottageId') + '/images' ,options)
                    .pipe(
                      map(returnedImages=> {
                        let imageUrls : any
                        imageUrls = returnedImages
                        imageUrls.forEach((path: string) => {
                          let obj = {
                            image: 'assets/cottage-pictures/'+ path,
                            thumbImage: 'assets/cottage-pictures/'+ path
                          }
                          this.imgCollection.push(obj)
                        });
                      })).subscribe()
            })  
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
  removeCottage(){
    
  }
  futureReservations(){

  }
  pastReservations(){
    
  }
  editCottage(){
    
  }
}

