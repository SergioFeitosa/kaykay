import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  userLogin: boolean = false

  constructor(
    private http: HttpClient,
  ) { }


  getUserLogin() {
    return this.userLogin;
  }

  login() {
    this.userLogin = true;
  }

  logout() {
    this.userLogin = false;    
  }

  userStatus() {
    this.userLogin = !this.userLogin;
  }

}
