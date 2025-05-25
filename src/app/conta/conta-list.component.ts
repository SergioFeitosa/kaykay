import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ContaService } from './conta.service';
import { Conta } from './conta';
import { Component, OnInit } from '@angular/core';
import { Pedido } from '../pedido/pedido';
import { Produto } from '../produto/produto';
import { PedidoService } from '../pedido/pedido.service';
import { environment } from '../../environments/environment.development';
import { CaminhoMenuComponent } from '../caminho-menu/caminho-menu.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  templateUrl: './conta-list.component.html',
  styleUrls: ['./conta-list.component.css'],
  standalone: true,
  imports: [
    CaminhoMenuComponent,
    CommonModule,
    FormsModule,
    MatRadioModule
  ]

})

export class ContaListComponent implements OnInit {


  filteredPedidos: Pedido[] = [];
  pedidos: Pedido[] = [];
  telefone: number = 0;
  codigo: number = 0;
  produto!: Produto;

  // modulo: string;
  // local: string;

  // tslint:disable-next-line:quotemark
  // tslint:disable-next-line:member-ordering
  displayStyle = 'none';
  displayStyleCartao = 'none';
  displayStylePix = 'none';
  displayStyleDinheiro = 'none';
  displayOperadora = 'none';

  contas: Conta[] = [];

  contaValorTotal: number = 0;

  filteredContas: Pedido[] = [];
  // tslint:disable-next-line:variable-name
  conta = {} as Conta;

  // tslint:disable-next-line:variable-name
  pedido = {} as Pedido;

  // tslint:disable-next-line:variable-name
  _pedidos: Pedido[] = [];

  // tslint:disable-next-line:variable-name
  _filterBy: string = '';

  operadoraSelecionada: string = '';
  operadoras: string[] = ['VISA', 'MASTERCARD', 'AMERICAN EXPRESS', 'ELO'];

  debitocreditoSelecionada: string = '';
  debcreds: string[] = ['Débito', 'Crédito'];

  trocoPara: number = 0;

  constructor(private pedidoService: PedidoService,
              private router: Router,
              private contaService: ContaService,
              private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.telefone = +environment.telefone;
    // this.modulo = 'Conta';
    // this.local = environment.local;

    environment.fundoColoridoCardapio = false;
    environment.fundoColoridoPedido = false;
    environment.fundoColoridoCozinha = false;
    environment.fundoColoridoBar = false;
    environment.fundoColoridoEntrega = false;
    environment.fundoColoridoConta = true;

    this.pedidoService.read().subscribe(pedidos => {
      this.pedidos = pedidos;
      this.filteredContas = this.pedidos.filter((pedido: Pedido) => pedido.telefone === environment.telefone);
    });
    this.displayStyle = 'block';
    this.openPopup();

  }

  // tslint:disable-next-line:typedef
  get filter() {
    return this._filterBy;
  }

  set filter(value: string) {
    this._filterBy = value;

    this.filteredContas =
      this.pedidos.filter((pedido: Pedido) => pedido.telefone.toString().indexOf(this._filterBy.toString()) > -1);
  }

  contaCreate(pedidoId: number): void {

    // tslint:disable-next-line:no-unused-expression
    this.pedidoService.readById(pedidoId).subscribe(pedido => {
      this.pedido = pedido;

      this.conta.pedido = this.pedido;
      this.conta.quantidade = 1;
      this.conta.valorProdutoUnitario = 1;
      this.conta.valorProdutoTotal = 1;
      this.conta.valorTotal = 1;

      this.contaService.create(this.conta).subscribe(() => {
        this.contaService.showMessage('Conta solicitada');
      }
      );
    });
  }


  // tslint:disable-next-line:typedef
  openPopup(): void {


    this.pedidoService.read().subscribe(pedidos => {
      this.pedidos = pedidos;
      this.filteredPedidos = this.pedidos.filter((pedido: Pedido) => pedido.telefone - environment.telefone === 0);

      this.contaValorTotal = 0;

      for (const pedido of this.filteredPedidos) {

          this.conta = new Conta();

          this.conta.pedido = pedido;
          this.conta.quantidade = 1;
          this.conta.valorProdutoUnitario =  pedido.carrinho.produto.preco;
          this.conta.valorProdutoTotal = this.conta.valorProdutoUnitario * this.conta.quantidade;
          this.contaValorTotal = this.contaValorTotal + this.conta.valorProdutoTotal;
          this.contas.push(this.conta);
      }
    });
    this.displayStyle = 'block';
  }

  // tslint:disable-next-line:typedef
  closePopup() {
    this.contas = [];
    this.displayStyle = 'none';
  }

  // tslint:disable-next-line:typedef
  pagamentoCartao() {
    this.contaService.showMessage('Aguarde o atendente');
    this.displayStyleCartao = 'block';
  }

  // tslint:disable-next-line:typedef
  pagamentoPix() {
    this.contaService.showMessage('Pagamento Pix');
    this.displayStylePix = 'block';
  }

  // tslint:disable-next-line:typedef
  pagamentoDinheiro() {
    this.contaService.showMessage('Aguarde o atendente');
    this.displayStyleDinheiro = 'block';
  }

    // tslint:disable-next-line:typedef
    closePagamentoCartao(operadora: string) {
      this.displayStyleCartao = 'none';
    }
  // tslint:disable-next-line:typedef
  closePagamentoPix() {
    this.displayStylePix = 'none';
  }

  // tslint:disable-next-line:typedef
  closePagamentoDinheiro() {
    this.displayStyleDinheiro = 'none';
  }

}
