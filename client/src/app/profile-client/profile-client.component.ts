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

    const headers = { 'content-type': 'application/json',
                      'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };

    alert(this.user.address)

    let user1 : Client = new Client()






    user1.email = this.user.email
    user1.phoneNumber = this.user.phoneNumber
    user1.address = this.user.address
    user1.country = this.user.country
    user1.city = this.user.city


    let body = JSON.stringify(user1)

    this.http.put<any>(this.endpoint.USERS, body, options).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
          alert("Bad request, please try again later.");
        } else {
          alert("Something went wrong");
          this.router.navigate(["login"])
        }
        return EMPTY;
      })).subscribe()
      this.editButtonClicked = false

  }

}
