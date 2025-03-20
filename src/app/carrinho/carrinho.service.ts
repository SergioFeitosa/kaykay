import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Carrinho } from './carrinho';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})

export class CarrinhoService {

  carrinho = {} as Carrinho;

  carrinhos: Carrinho[] = [];

  constructor(private snackBar: MatSnackBar,
              private http: HttpClient) {}

  // tslint:disable-next-line:quotemark
  // baseUrl = "http://localhost:3001/carts";

  // baseUrl = 'http://localhost:8080/quiosqueBackend/carts';

  baseUrl = 'http://localhost:8080/carts';

  // baseUrl = 'http://localhost:8080/quiosque/carts';

  // baseUrl = 'https://sgpn.com.br/quiosqueBackend/carts';

  // baseUrl = 'https://quiosque.sgpn.com.br/carts';

  // baseUrl = 'https://sgpn.com.br/carts';

  // baseUrl = 'https://springboot-postgresheroku.herokuapp.com/api/v1/carts';


  // tslint:disable-next-line:variable-name
  private _listners = new Subject<any>();

  showMessage(msg: string): void {
    this.snackBar.open(msg, '', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['custom-css-class']
    });
  }

  create(carrinho: Carrinho): Observable<Carrinho>{
    return this.http.post<Carrinho>(this.baseUrl, carrinho);

  }

  update(carrinho: Carrinho): Observable<Carrinho>{
    const url = `${this.baseUrl}/${carrinho.id}`;
    return this.http.put<Carrinho>(url, carrinho);

  }

  read(): Observable<Carrinho[]> {
    return this.http.get<Carrinho[]>(this.baseUrl);
  }

  readById(carrinhoId: number): Observable<Carrinho> {
    const url = `${this.baseUrl}/${carrinhoId}`;
    return this.http.get<Carrinho>(url);
  }

  delete(carrinhoId: number): Observable<Carrinho> {
    const url = `${this.baseUrl}/${carrinhoId}`;
    return this.http.delete<Carrinho>(url);
  }

}

