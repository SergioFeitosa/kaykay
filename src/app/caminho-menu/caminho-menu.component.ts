import { Component, OnInit, Injectable } from '@angular/core';
import { Pedido } from '../pedido/pedido';
import { Produto } from '../produto/produto';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgOtpInputModule } from 'ng-otp-input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-caminho-menu',
  templateUrl: './caminho-menu.component.html',
  styleUrls: ['./caminho-menu.component.css'],
  imports: [ 
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatRadioModule,
    MatSnackBarModule,
    NgOtpInputModule,
    NoopAnimationsModule,
    RouterModule,
  ]  

})

@Injectable({
  providedIn: 'root'
})

export class CaminhoMenuComponent implements OnInit {

  fundoColoridoCardapio = environment.fundoColoridoCardapio;
  fundoColoridoPedido = environment.fundoColoridoPedido;
  fundoColoridoCozinha = environment.fundoColoridoCozinha;
  fundoColoridoBar = environment.fundoColoridoBar;
  fundoColoridoEntrega = environment.fundoColoridoEntrega;
  fundoColoridoConta = environment.fundoColoridoConta;

  filteredPedidos: Pedido[] = [];
  pedidos: Pedido[] = [];
  pedido!: Pedido;
  telefone: number = 0;
  codigo: number = 0;
  produto!: Produto;

  contaValorTotal: number = 0;


  constructor(
  ) { 
    console.log('passano pelo caminho')
  }

  ngOnInit(): void {

    this.fundoColoridoCardapio = environment.fundoColoridoCardapio;
    this.fundoColoridoPedido = environment.fundoColoridoPedido;
    this.fundoColoridoCozinha = environment.fundoColoridoCozinha;
    this.fundoColoridoBar = environment.fundoColoridoBar;
    this.fundoColoridoEntrega = environment.fundoColoridoEntrega;
    this.fundoColoridoConta = environment.fundoColoridoConta;
  }

}
