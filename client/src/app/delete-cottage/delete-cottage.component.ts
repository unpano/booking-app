import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Endpoint } from '../util/endpoints-enum';

@Component({
  selector: 'app-delete-cottage',
  templateUrl: './delete-cottage.component.html',
  styleUrls: ['./delete-cottage.component.css']
})
export class DeleteCottageComponent implements OnInit {

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

    this.http.delete<any>(this.endpoint.COTTAGES + 'delete/' +  sessionStorage.getItem('cottageId'),options).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
          alert("Bad request, please try again later.");
        } else {
          alert("Could not remove cottage with id " + sessionStorage.getItem('cottageId') + ".");
        }
        return EMPTY;
      })).subscribe(() => alert("Your cottage is deleted."))
  }

  cancel(){
      this.router.navigate(["cottage"])
  }
}
