import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

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
    environment.login = false;
    environment.telefone = 0
  }

  userStatus() {
    this.userLogin = !this.userLogin;
  }

}
