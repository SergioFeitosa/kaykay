import { Produto } from '../produto/produto';
import { Router, RouterLink } from '@angular/router';
import { CarrinhoService } from './carrinho.service';
import { Carrinho } from './carrinho';
import { Component, OnInit } from '@angular/core';
import { Pedido } from '../pedido/pedido';
import { PedidoService } from '../pedido/pedido.service';
import { interval, Subscription } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StarComponent } from '../star/star.component';
import { CaminhoMenuComponent } from '../caminho-menu/caminho-menu.component';

@Component({ 
  standalone: true,
  imports: [
    CaminhoMenuComponent,
    CommonModule,
    FormsModule,
    RouterLink,
    StarComponent

  ],
  templateUrl: './carrinho-list.component.html' 
})

export class CarrinhoListComponent implements OnInit {

  private updateSubscription!: Subscription;

  login: boolean = false;

  // modulo: string;
  // local: string;
  fundoColoridoPedido: boolean = false;

  // tslint:disable-next-line:variable-name
  _categoryId: string = '';

  filteredCarrinhos: Carrinho[] = [];
  carrinhos: Carrinho[] = [];
  // tslint:disable-next-line:variable-name
  pedido = {} as Pedido;

  produto = {} as Produto;

  carrinho = {} as Carrinho;
  // tslint:disable-next-line:variable-name
  _carrinho = {} as Carrinho;

  // tslint:disable-next-line:variable-name
  _carrinhos: Carrinho[] = [];

  // tslint:disable-next-line:variable-name
  _filterBy: string = '';

  statusBool: boolean = false;

  container = document.querySelector('.container');

  constructor(
    private carrinhoService: CarrinhoService,
    private pedidoService: PedidoService,
    private router: Router,
  ) {

  }

  ngOnInit(): void {

    // this.modulo = 'Pedido';
    // this.local = environment.local;
    this.carrinho.quantidade = 1;

    environment.fundoColoridoCardapio = false;
    environment.fundoColoridoPedido = true;
    environment.fundoColoridoCozinha = false;
    environment.fundoColoridoBar = false;
    environment.fundoColoridoEntrega = false;
    environment.fundoColoridoConta = false;

    // entram no if somente administradores, clientes saem pelo else

    if (+environment.telefone === 5511982551256 || +environment.telefone === 99999999997) {

      this.carrinhoService.read().subscribe(carrinhos => {
        this.carrinhos = carrinhos;
        this.filteredCarrinhos = this.carrinhos
          .filter((carrinho: Carrinho) => carrinho.enviado !== true);
      });

      this.updateSubscription = interval(5000).subscribe(
        (val) => {

          this.carrinhoService.read().subscribe(carrinhos => {
            this.carrinhos = carrinhos;
            this.filteredCarrinhos = this.carrinhos
              .filter((carrinho: Carrinho) => carrinho.enviado !== true);
          });
      });
    } else {

      this.carrinhoService.read().subscribe(carrinhos => {
        this.carrinhos = carrinhos;
        this.filteredCarrinhos = this.carrinhos
        .filter((carrinho: Carrinho) => carrinho.telefone - environment.telefone === 0)
        .filter((carrinho: Carrinho) => carrinho.enviado !== true);
        //alert('passei carrinho 1');
        //alert('passei carrinho ENV ' + +environment.telefone);
        //alert('passei carrinho TEL ' + +this.carrinho.telefone);
      });

      this.updateSubscription = interval(5000).subscribe(
        (val) => {

          this.carrinhoService.read().subscribe(carrinhos => {
            this.carrinhos = carrinhos;
            this.filteredCarrinhos = this.carrinhos
            .filter((carrinho: Carrinho) => carrinho.telefone - environment.telefone === 0)
            .filter((carrinho: Carrinho) => carrinho.enviado !== true);
            //alert('passei carrinho 2');
          });
      });
    }
  }

    // tslint:disable-next-line:typedef
    minus() {

      if (this.carrinho.quantidade !== 1) {
        this.carrinho.quantidade--;
        this.atualizarCarrinho(this.carrinho);
      }
    }

    // tslint:disable-next-line:typedef
    plus() {
      if (this.carrinho.quantidade !== 10) {
        this.carrinho.quantidade++;
        this.atualizarCarrinho(this.carrinho);
      }
    }
  // tslint:disable-next-line:typedef
  get filter() {
    return this._filterBy;
  }

  set filter(value: string) {
    this._filterBy = value;

    if (environment.telefone === 5511982551256 || environment.telefone === 99999999997) {

      this.filteredCarrinhos =
        this.carrinhos
          .filter((carrinho: Carrinho) => carrinho.enviado !== true)
          .filter((carrinho: Carrinho) => carrinho.produto.nome.toLocaleLowerCase().indexOf(this._filterBy.toLocaleLowerCase()) > -1);

    } else {

      this.filteredCarrinhos =
        this.carrinhos
          .filter((carrinho: Carrinho) => carrinho.enviado !== true)
          .filter((carrinho: Carrinho) => environment.telefone - carrinho.telefone === 0)
          .filter((carrinho: Carrinho) => carrinho.produto.nome.toLocaleLowerCase().indexOf(this._filterBy.toLocaleLowerCase()) > -1);

    }
  }
  // tslint:disable-next-line:quotemark
  // tslint:disable-next-line:member-ordering
  displayStyle = 'none';

  // tslint:disable-next-line:typedef
  openPopup(carrinhoId: number): void {
    // tslint:disable-next-line:no-unused-expression
    this.carrinhoService.readById(carrinhoId).subscribe(carrinho => {
      this.carrinho = carrinho;
      this.produto = this.carrinho.produto;
      if(this.carrinho.status.toLowerCase() === 'pendente'){
        this.statusBool = true;
      }
    });

    this.displayStyle = 'block';
  }

  // tslint:disable-next-line:typedef
  closePopup() {
    this.displayStyle = 'none';

    this.atualizarCarrinho(this.carrinho);


    // tslint:disable-next-line:prefer-const
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);

  }


  pedidoCreate(carrinhoId: number): void {

    // tslint:disable-next-line:no-unused-expression
    this.carrinhoService.readById(carrinhoId).subscribe(carrinho => {
      this.carrinho = carrinho;

      if (carrinho.enviado !== true) {

        this.carrinho.enviado = false;
        this.carrinho.status = 'Confirmado';

        this.atualizarCarrinho(this.carrinho);

        this.pedido.telefone = this.carrinho.telefone;
        this.pedido.local = this.carrinho.local;
        this.pedido.quantidade = this.carrinho.quantidade;
        this.pedido.observacao = this.carrinho.observacao;
        this.pedido.isencao = this.carrinho.isencao;
        this.pedido.dataCriacao = this.carrinho.dataCriacao;
        this.pedido.enviado = false;
        this.pedido.status = 'Confirmado';
        this.pedido.carrinho = this.carrinho;

        this.pedido.produto = this.carrinho.produto;

        this.pedidoService.create(this.pedido).subscribe(() => {
          this.pedidoService.showMessage('Pedido solicitado');
        });
      }
    });

    this.closePopup();
  }


  // tslint:disable-next-line:typedef
  atualizarCarrinho(carrinho: Carrinho) {

    this.carrinhoService.update(carrinho).subscribe(() => {
      this.carrinhoService.showMessage('Carrinho Atualizado');
    });
  }


}

