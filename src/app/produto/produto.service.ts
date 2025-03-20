import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable, Type } from '@angular/core';
import { Produto } from './produto';
import { MatSnackBar as MatSnackBar } from '@angular/material/snack-bar';
import { Carrinho } from '../carrinho/carrinho';
import { CarrinhoService } from '../carrinho/carrinho.service';


@Injectable({
  providedIn: 'root',
})

export class ProdutoService {

  // tslint:disable-next-line:quotemark
  // baseUrl = "http://localhost:3001/produtos";

  // baseUrl = 'http://localhost:8080/quiosqueBackend/produtos';

  baseUrl = 'http://localhost:8080/produtos';

  // baseUrl = 'https://sgpn.com.br/quiosqueBackend/produtos';

  // baseUrl = 'https://quiosque.sgpn.com.br/produtos';

  // baseUrl = 'https://sgpn.com.br/produtos';

  produtos!: Observable<Produto[]>;

  // tslint:disable-next-line:variable-name
  produto = {} as Produto;

  // tslint:disable-next-line:variable-name
  carrinho = {} as Carrinho;

  constructor(
    private carrinhoService: CarrinhoService,
    private snackBar: MatSnackBar,
    private http: HttpClient) {

  }

  // tslint:disable-next-line:typedef
  create(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.baseUrl, produto);
  }

  showMessage(msg: string): void {
    this.snackBar.open(msg, '', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['custom-css-class']
    });
  }

  read(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.baseUrl);

  }

  readById(produtoId: number): Observable<Produto> {
    const url = `${this.baseUrl}/${produtoId}`;
    return this.http.get<Produto>(url);
  }

}
