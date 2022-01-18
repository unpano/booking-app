import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-client-profile',
  templateUrl: './delete-client-profile.component.html',
  styleUrls: ['./delete-client-profile.component.css']
})
export class DeleteClientProfileComponent implements OnInit {

  reason !: String

  
  constructor() { }

  ngOnInit(): void {
  }

}
