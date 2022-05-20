import { HttpClient ,HttpErrorResponse} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../dto/user';
import { Endpoint } from '../util/endpoints-enum';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-add-new-admin',
  templateUrl: './add-new-admin.component.html',
  styleUrls: ['./add-new-admin.component.css']
})
export class AddNewAdminComponent implements OnInit {

  name !: String
  surname !: String
  email !: string
  password !: String
  rePassword !: String
  address !: String
  city !: String
  country !: String
  phone !: String
  reason !: String
  role !: String
  options = [{id:1,name:"ROLE_CLIENT"}]

  endpoint = Endpoint



  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
  }

  selectAdmin(){
    this.role = "ROLE_ADMIN"
  }

  showPasswordFunction() {
    var x !: any;
    x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }


  showRePasswordFunction() {
    var x !: any;
    x = document.getElementById("rePassword");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
  

  signUp(){
    let user: User = new User();
    user.email = this.email
    user.password = this.password
    user.firstName = this.name
    user.lastName = this.surname
    user.address = this.address
    user.city = this.city
    user.country = this.country
    user.phoneNumber = this.phone
    user.userType = "ROLE_ADMIN"

    
    
    const body=JSON.stringify(user);

    console.log(body);
    


    const headers = { 'content-type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem("token")}  
  let options = { headers: headers };
    
    this.http.post<any>(this.endpoint.NEW_ADMIN, body, options).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
          alert("Bad request, please try again.");
        } else {
          alert("Username is not unique or you didn`t fill all of the fields. Please try again.");
        }

        return EMPTY;
      }),
      map(returnedPersonId => {
        //after creating new admin,back to home page 
          alert("Successfully created new admin!");
          this.router.navigate(['admin']);

})
    ).subscribe()

  }

  confirmPassword(){
    if(this.password != this.rePassword || this.rePassword == undefined)
      return 1
    else return 0
  }

}
