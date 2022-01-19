import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Endpoint } from '../util/endpoints-enum';

@Component({
  selector: 'app-delete-boat',
  templateUrl: './delete-boat.component.html',
  styleUrls: ['./delete-boat.component.css']
})
export class DeleteBoatComponent implements OnInit {

  endpoint = Endpoint;
  description !: String

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
  }

  onSubmit() {
    //salje se zahtev za brisanje profila
    const headers = { 'content-type': 'application/json',
                      'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
    let options = { headers: headers };

    this.http.delete<any>(this.endpoint.BOATS + 'delete/' +  sessionStorage.getItem('boatId'),options).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
          alert("Bad request, please try again later.");
        } else {
          alert("Boat is or has been reserved and could not be deleted.");
        }
        return EMPTY;
      })).subscribe(() => {
        alert("Your boat is deleted.");
        this.router.navigate(["boats"])
      })
  }

  cancel(){
      this.router.navigate(["boat"])
  }
}
