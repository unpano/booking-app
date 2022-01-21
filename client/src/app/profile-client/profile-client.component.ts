import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DeleteClientProfileComponent } from '../delete-client-profile/delete-client-profile.component';
import { Client } from '../dto/client';
import { SubscribedBoatsComponent } from '../subscribed-boats/subscribed-boats.component';
import { Endpoint } from '../util/endpoints-enum';

@Component({
  selector: 'app-profile-client',
  templateUrl: './profile-client.component.html',
  styleUrls: ['./profile-client.component.css']
})
export class ProfileClientComponent implements OnInit {

  user: Client = new Client()
  endpoint = Endpoint
  editButtonClicked !: boolean

  user1: any

  email !: String
  address !: String
  city !: String
  country !: String
  phoneNumber !: String
  role : any



  constructor(private router: Router, private http: HttpClient, private dialog: MatDialog) { }

  ngOnInit(): void {

    this.role = sessionStorage.getItem('role')



    const headers = { 'content-type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  

      let options = { headers: headers };

      this.http.get<any>(this.endpoint.FIND_CLIENT+ sessionStorage.getItem('id'), options).pipe(
          map(returnedUser => {
               this.user = returnedUser
      })).subscribe()

  }

  findSubscribed()
  {

    let dialogRef = this.dialog.open(SubscribedBoatsComponent,{
      autoFocus: false,
      maxHeight: '90vh' 
    })
    dialogRef.afterClosed().subscribe();

  }

  clickOnEditButton(){
    this.editButtonClicked = true;
  }


deleteProfile()
{
  let dialogRef = this.dialog.open(DeleteClientProfileComponent)
  dialogRef.afterClosed().subscribe();
}

  
  onSubmit() {
    this.editButtonClicked = false

    //update user info
    const headers = { 'content-type': 'application/json',
                      'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };

    if(this.email != undefined)
      this.user1.email = this.email
    if(this.address != undefined)
      this.user1.address = this.address
    if(this.city != undefined)
      this.user1.city = this.city
    if(this.country != undefined)
      this.user1.country = this.country
    if(this.phoneNumber != undefined)
      this.user1.phoneNumber = this.phoneNumber

    let body = JSON.stringify(this.user1)

    this.http.put<any>(this.endpoint.USERS, body, options).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
          alert("Bad request, please try again later.");
        } else {
          alert("User with username " + this.email + ' already exists.');
          this.router.navigate(["login"])
        }
        return EMPTY;
      })).subscribe()
  }

}
