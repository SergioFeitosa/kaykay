import { Component, OnInit } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { Init } from 'v8';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  login: boolean = false

  ngOnInit(): void {
    this.login = !this.login
  }  

}
