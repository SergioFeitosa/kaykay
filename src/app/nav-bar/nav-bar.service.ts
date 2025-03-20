import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL = environment.ApiURL;

@Injectable({
  providedIn: 'root',
})
export class NavBarService{
  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: typedef
  enviarCodigo(telefone: string, message: string) {

    return this.http
      .post(
        API_URL + '/send-message',
        { telefone, message },
        { observe: 'response'}
      );
    }
}
