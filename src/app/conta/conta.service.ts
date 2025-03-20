import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar as MatSnackBar } from '@angular/material/snack-bar';
import { Conta } from './conta';

@Injectable({
  providedIn: 'root',
})

export class ContaService {

  // tslint:disable-next-line:quotemark
  // baseUrl = "http://localhost:3001/contas";

  baseUrl = "http://localhost:8080/contas";

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

  create(conta: Conta): Observable<Conta> {
    return this.http.post<Conta>(this.baseUrl, conta);

  }

  read(): Observable<Conta[]> {
    return this.http.get<Conta[]>(this.baseUrl);

  }

  readById(contaId: number): Observable<Conta> {
    const url = `${this.baseUrl}/${contaId}`;
    return this.http.get<Conta>(url);
  }

}


