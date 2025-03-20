import { TelefoneValidacao } from '../telefone-validacao';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar as MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TelefoneValidacaoService {

  // tslint:disable-next-line:quotemark
  baseUrl = "https://api.zenvia.com/v2/channels/sms/messages";
  httpOptions = {
    headers: new HttpHeaders({
      'X-API-TOKEN':  'qQ27V-MPWgxqf84uJR6M23bKFPXdUgiMjmOD'
    })
  };

  db = '../telefone/telefone.json';

  header = {
    headers: new HttpHeaders()
    .set('X-API-TOKEN',  'qQ27V-MPWgxqf84uJR6M23bKFPXdUgiMjmOD')
  };
  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, '', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['custom-css-class']
    });
  }

  create(telefoneValidacao: TelefoneValidacao): Observable<TelefoneValidacao> {


    console.log('url ' + this.baseUrl);
    console.log('telefone from ' + telefoneValidacao.from);
    console.log('telefone to ' + telefoneValidacao.to.valueOf());
    console.log('telefone type ' + telefoneValidacao.contents[0].type);
    console.log('telefone text ' + telefoneValidacao.contents[0].text);
    console.log('options ' + this.httpOptions.headers);



    return this.http.post<TelefoneValidacao>(this.baseUrl, this.db, this.header);

  }
}
