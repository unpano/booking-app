import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
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
  pickCottage !: FormGroup;
  pictureUrls : string[] = [];

  constructor(private router: Router,private sanitizer: DomSanitizer, private http: HttpClient) { 
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    this.pickCottage = new FormGroup({
      start: new FormControl(new Date(year, month, 11)),
      end: new FormControl(new Date(year, month, 15)),
    });
  }

  ngOnInit(): void {
    //if token expired
    if(sessionStorage.getItem('token') == null){
      this.router.navigate([''])
    }

    //cottage details
    const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };

    this.http
        .get(this.endpoint.COTTAGES + sessionStorage.getItem('cottageId') ,options)
          .pipe(
            map(returnedCottage=> {
              this.cottage = returnedCottage
            })).subscribe(() =>
            {
              //pronadji sve slike vikendice i pushuj ih u pictureUrls
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

  bookCottage(){
    
  }
  removeCottage(){
    
  }
  futureReservations(){

  }
  pastReservations(){
    
  }
}
