import { Produto } from '../produto/produto';
import { PedidoService } from '../pedido/pedido.service';
import { Pedido } from '../pedido/pedido';
import { Component, NgModule, OnInit } from '@angular/core';
import { Entrega } from '../entrega/entrega';
import { EntregaService } from '../entrega/entrega.service';
import { interval, Subscription } from 'rxjs';
import { Carrinho } from '../carrinho/carrinho';
import { CarrinhoService } from '../carrinho/carrinho.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { CaminhoMenuComponent } from '../caminho-menu/caminho-menu.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StarComponent } from '../star/star.component';



@Component({
  selector: 'app-pedido-bar-list',
  standalone: true,
  imports: [
    CaminhoMenuComponent,
    CommonModule, 
    FormsModule,
    RouterLink,
    StarComponent
  ],
  templateUrl: './pedidoBar-list.component.html',    
})

export class PedidoBarListComponent implements OnInit {

  private updateSubscription!: Subscription;

  modulo: string = '';
  local: string = '';
  telefone: number = 0;
  login: boolean = false;
  // tslint:disable-next-line:variable-name
  _categoryId: string = '';

  displayStyle: string = '';

  filteredPedidos: Pedido[] = [];
  pedidos: Pedido[] = [];

  // tslint:disable-next-line:variable-name
  entrega = {} as Entrega;

  // tslint:disable-next-line:variable-name
  produto = {} as Produto;

  carrinho = {} as Carrinho;

  // tslint:disable-next-line:variable-name
  pedido = {} as Pedido;

  // tslint:disable-next-line:variable-name
  _pedidos: Pedido[] = [];

  // tslint:disable-next-line:variable-name
  _filterBy: string = '';

  constructor(
    private pedidoService: PedidoService,
    private carrinhoService: CarrinhoService,
    private entregaService: EntregaService,
    private router: Router,
  ) {

  }

  ngOnInit(): void {

    this.telefone = +environment.telefone;
    this.modulo = 'Cozinha';
    this.local = environment.local;

    environment.fundoColoridoCardapio = false;
    environment.fundoColoridoPedido = false;
    environment.fundoColoridoCozinha = false;
    environment.fundoColoridoBar = true;
    environment.fundoColoridoEntrega = false;
    environment.fundoColoridoConta = false;


    if (+environment.telefone === 5511982551256 || +environment.telefone === 5599999999998) {

      this.pedidoService.read().subscribe(pedidos => {
        this.pedidos = pedidos;
        this.filteredPedidos = this.pedidos
          .filter((pedido: Pedido) => pedido.enviado !== true)
          .filter((pedido: Pedido) => pedido.carrinho.produto.categoria.toLowerCase() === 'bebidas');
      });

      this.updateSubscription = interval(5000).subscribe(
        (val) => {
          this.pedidoService.read().subscribe(pedidos => {
            this.pedidos = pedidos;
            this.filteredPedidos = this.pedidos
              .filter((pedido: Pedido) => pedido.enviado !== true)
              .filter((pedido: Pedido) => pedido.carrinho.produto.categoria.toLowerCase() === 'bebidas');
          });
        });

    } else {

      this.pedidoService.read().subscribe(pedidos => {
        this.pedidos = pedidos;
        this.filteredPedidos = this.pedidos.filter((pedido: Pedido) => pedido.telefone - environment.telefone === 0)
          .filter((pedido: Pedido) => pedido.enviado !== true)
          .filter((pedido: Pedido) => pedido.carrinho.produto.categoria.toLowerCase() === 'bebidas');
      });
    }

  }

  // tslint:disable-next-line:typedef
  get filter() {
    return this._filterBy;
  }

  set filter(value: string) {
    this._filterBy = value;

    if (+environment.telefone === 5511982551256 || +environment.telefone === 5599999999998) {

      this.filteredPedidos =
        this.pedidos
          .filter((pedido: Pedido) => pedido.enviado !== true)
          .filter((pedido: Pedido) => pedido.carrinho.produto.nome.toLocaleLowerCase().indexOf(this._filterBy.toLocaleLowerCase()) > -1)
          .filter((pedido: Pedido) => pedido.carrinho.produto.categoria.toLowerCase() === 'bebidas');

    } else {

      this.filteredPedidos =
        this.pedidos
          .filter((pedido: Pedido) => pedido.enviado !== true)
          .filter((pedido: Pedido) => pedido.telefone - environment.telefone === 0)
          .filter((pedido: Pedido) => pedido.carrinho.produto.nome.toLocaleLowerCase().indexOf(this._filterBy.toLocaleLowerCase()) > -1)
          .filter((pedido: Pedido) => pedido.carrinho.produto.categoria.toLowerCase() === 'bebidas');

    }
  }



  async entregaCreate(pedidoId: number): Promise<void> {

    // tslint:disable-next-line:no-unused-expression
    const response = await this.pedidoService.readById(pedidoId).subscribe(async pedido => {
      this.pedido = pedido;

      if (this.pedido.enviado !== true) {

        // tslint:disable-next-line:no-unused-expression
        const response = await this.carrinhoService.readById(this.pedido.carrinho.id!).subscribe(carrinho => {
          this.carrinho = carrinho;
          this.carrinho.status = 'Saiu para entrega';
          this.atualizarCarrinho(this.carrinho);
        })
        
        this.pedido.carrinho = this.carrinho;
        this.pedido.enviado = false;
        this.pedido.status = 'Saiu para entrega';
        //this.pedido.carrinho.status = 'Saiu para entrega';
        const response2 = await this.atualizarPedido(this.pedido);


        this.entrega.pedido = this.pedido;

        const response3 = await this.entregaService.create(this.entrega).subscribe(() => {
          this.entregaService.showMessage('Saiu para entrega');
        });
      }
    });
  }


  // tslint:disable-next-line:typedef
  openPopup(pedidoId: number): void {
    // tslint:disable-next-line:no-unused-expression
    this.pedidoService.readById(pedidoId).subscribe(pedido => {
      this.pedido = pedido;
      this.produto = this.pedido.carrinho.produto;
    });

    this.displayStyle = 'block';
  }

  // tslint:disable-next-line:typedef
  closePopup() {
    this.displayStyle = 'none';
    // tslint:disable-next-line:prefer-const
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);

  }

  // tslint:disable-next-line:typedef
  minus(pedido: Pedido) {
    if (pedido.carrinho.quantidade !== 1) {
      pedido.carrinho.quantidade--;
      this.atualizarCarrinho(pedido.carrinho)
    }
  }

  // tslint:disable-next-line:typedef
  plus(pedido: Pedido) {
    if (pedido.carrinho.quantidade !== 10) { 
      pedido.carrinho.quantidade++;
      this.atualizarCarrinho(pedido.carrinho)
    }
  }

    // tslint:disable-next-line:typedef
  atualizarObservacao(pedido: Pedido) {
    this.atualizarCarrinho(pedido.carrinho);
  }



  // tslint:disable-next-line:typedef
  atualizarPedido(pedido: Pedido) {
    this.pedidoService.update(pedido).subscribe(() => {
      this.pedidoService.showMessage('Pedido Atualizado');
      this.carrinhoService.readById(pedido.carrinho.id!).subscribe(carrinho => {
         this.carrinho = pedido.carrinho;
         this.carrinho.observacao = pedido.observacao;
         this.atualizarCarrinho(pedido.carrinho);
      })

    });
  }

  // tslint:disable-next-line:typedef
  atualizarCarrinho(carrinho: Carrinho) {
    this.carrinhoService.update(carrinho).subscribe(() => {
      this.carrinhoService.showMessage('Carrinho Atualizado');
    });
  }

}
