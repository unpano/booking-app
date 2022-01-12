import { HttpClient } from '@angular/common/http';
import { BoundTextAst } from '@angular/compiler';
import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { Router } from '@angular/router';
import { Endpoint } from '../util/endpoints-enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  endpoint = Endpoint

  constructor(private router: Router,private http: HttpClient) { }

  boats: any;

  ngOnInit(): void {

   

  }



}
