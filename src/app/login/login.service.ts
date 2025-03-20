import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';


const API_URL = environment.ApiURL;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  enviarCodigo(telefone: string, message: string) {

    return this.http
      .post(
        API_URL + '/send-message',
        { telefone, message },
        { observe: 'response'}
      );
    }
}
