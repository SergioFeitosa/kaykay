import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Entrega } from './entrega';
import { MatSnackBar as MatSnackBar} from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root',
})

export class EntregaService {

  // tslint:disable-next-line:quotemark
  // baseUrl = "http://localhost:3001/deliveries";

  // baseUrl = 'http://localhost:8080/quiosqueBackend/deliveries';

  baseUrl = 'http://localhost:8080/deliveries';

  // baseUrl = 'https://sgpn.com.br/quiosqueBackend/deliveries';

  // baseUrl = 'https://quiosque.sgpn.com.br/deliveries';

  // baseUrl = 'https://sgpn.com.br/deliveries';

  // baseUrl = 'https://sgpn.com.br/deliveries';

  // baseUrl = 'https://springboot-postgresheroku.herokuapp.com/api/v1/deliveries';

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

  create(entrega: Entrega): Observable<Entrega>{
    return this.http.post<Entrega>(this.baseUrl, entrega);

  }

  read(): Observable<Entrega[]> {
    return this.http.get<Entrega[]>(this.baseUrl);

  }

  readById(entregaId: number): Observable<Entrega> {
    const url = `${this.baseUrl}/${entregaId}`;
    return this.http.get<Entrega>(url);
  }

  update(entrega: Entrega): Observable<Entrega>{
    const url = `${this.baseUrl}/${entrega.id}`;
    return this.http.put<Entrega>(url, entrega);

  }


}

