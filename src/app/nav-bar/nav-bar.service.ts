import { environment } from './../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavBarComponent } from './nav-bar.component';

const API_URL = environment.ApiURL;

@Injectable({
  providedIn: 'root',
})
export class NavBarService{

  userLogin: boolean = false

  constructor(
    private http: HttpClient,
  ) { }

  login() {
    this.userLogin = true
  }

  logout() {
    this.userLogin = false    
  }

  userStatus() {
    this.userLogin = !this.userLogin
  }

  // tslint:disable-next-line: typedef
  enviarCodigo(
    telefone: string, 
    message: string
    ) {

      return this.http
        .post(
          API_URL + '/send-message',
          { telefone, message },
          { observe: 'response'}
      );
  }


}
