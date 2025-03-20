import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pedido } from './pedido';
import { MatSnackBar as MatSnackBar} from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root',
})

export class PedidoService {


  // tslint:disable-next-line:quotemark
  // baseUrl = "http://localhost:3001/pedidos";

  // baseUrl = 'http://localhost:8080/quiosqueBackend/pedidos';

  baseUrl = 'http://localhost:8080/pedidos';

  // baseUrl = 'https://sgpn.com.br/quiosqueBackend/pedidos';

  // baseUrl = 'https://quiosque.sgpn.com.br/pedidos';

  // baseUrl = 'https://sgpn.com.br/pedidos';

  // baseUrl = 'https://sgpn.com.br/pedidos';

  // baseUrl = 'https://springboot-postgresheroku.herokuapp.com/api/v1/orders';


  constructor(private snackBar: MatSnackBar,
              private http: HttpClient) {}

  showMessage(msg: string): void {
    this.snackBar.open(msg, '', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['custom-css-class']
    });
  }

  create(pedido: Pedido): Observable<Pedido>{
    return this.http.post<Pedido>(this.baseUrl, pedido);

  }

  update(pedido: Pedido): Observable<Pedido>{
    const url = `${this.baseUrl}/${pedido.id}`;
    return this.http.put<Pedido>(url, pedido);

  }

  read(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.baseUrl);

  }

  readById(pedidoId: number): Observable<Pedido> {
    const url = `${this.baseUrl}/${pedidoId}`;
    return this.http.get<Pedido>(url);
  }

  delete(pedidoId: number): Observable<Pedido> {
    const url = `${this.baseUrl}/${pedidoId}`;
    return this.http.delete<Pedido>(url);
  }

}

