import { EntregaService } from './entrega.service';
import { Entrega } from './entrega';
import { Component, OnInit } from '@angular/core';
import { Produto } from '../produto/produto';
import { Pedido } from '../pedido/pedido';
import { PedidoService } from '../pedido/pedido.service';
import { CarrinhoService } from '../carrinho/carrinho.service';
import { Carrinho } from '../carrinho/carrinho';
import { ActivatedRoute, Router } from '@angular/router';
import { CaminhoMenuComponent } from '../caminho-menu/caminho-menu.component';
import { StarComponent } from '../star/star.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment.development';

@Component({
  templateUrl: './entrega-list.component.html',
  styleUrls: ['./entrega-list.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    CaminhoMenuComponent,
    //StarComponent

  ]

})

export class EntregaListComponent implements OnInit {

  telefone: number = 0;
  // modulo: string;
  // local: string;

  fundoColoridoEntrega: boolean = false;

  // tslint:disable-next-line:variable-name
  _categoryId: string = '';

  filteredEntregas: Entrega[] = [];
  entregas: Entrega[] = [];

  produto = {} as Produto;
  pedido = {} as Pedido;
  carrinho = {} as Carrinho;
  entrega = {} as Entrega;

  // tslint:disable-next-line:variable-name
  _entregas: Entrega[] = [];

  // tslint:disable-next-line:variable-name
  _filterBy: string = '';

  constructor(
    private entregaService: EntregaService,
    private pedidoService: PedidoService,
    private carrinhoService: CarrinhoService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {

  }

  ngOnInit(): void {

    this.telefone = environment.telefone;
    // this.modulo = 'Entrega';
    // this.local = environment.local;

    environment.fundoColoridoCardapio = false;
    environment.fundoColoridoPedido = false;
    environment.fundoColoridoCozinha = false;
    environment.fundoColoridoBar = false;
    environment.fundoColoridoEntrega = true;
    environment.fundoColoridoConta = false;


    if (+environment.telefone === 5511982551256 || +environment.telefone === 5599999999996) {
      this.entregaService.read().subscribe(entregas => {
        this.entregas = entregas;
        this.filteredEntregas = this.entregas;
      });

    } else {

      this.entregaService.read().subscribe(entregas => {
        this.entregas = entregas;
        this.filteredEntregas = this.entregas.filter((entrega: Entrega) => entrega.pedido.telefone - environment.telefone === 0);
      });

    }
  }

  // tslint:disable-next-line:typedef
  get filter() {
    return this._filterBy;
  }

  set filter(value: string) {
    this._filterBy = value;

    if (+environment.telefone === 5511982551256 || +environment.telefone === 5599999999996) {
      this.filteredEntregas =
        this.entregas
          .filter((entrega: Entrega) => entrega.pedido.carrinho.produto.nome.toLocaleLowerCase().indexOf(this._filterBy.toLocaleLowerCase()) > -1);

    } else {

      this.filteredEntregas =
        this.entregas
          .filter((entrega: Entrega) => entrega.pedido.telefone - environment.telefone === 0)
          .filter((entrega: Entrega) => entrega.pedido.carrinho.produto.nome.toLocaleLowerCase().indexOf(this._filterBy.toLocaleLowerCase()) > -1);

    }
  }


  // tslint:disable-next-line:quotemark
  // tslint:disable-next-line:member-ordering
  displayStyle = 'none';

  // tslint:disable-next-line:typedef
  openPopup(entregaId: number): void {
    // tslint:disable-next-line:no-unused-expression
    this.entregaService.readById(entregaId).subscribe(entrega => {
      this.entrega = entrega;
      this.pedido = this.entrega.pedido;
      this.carrinho = this.entrega.pedido.carrinho;
      this.produto = this.entrega.pedido.carrinho.produto;
    });

    this.displayStyle = 'block';
  }

  // tslint:disable-next-line:typedef
  closePopup() {
    this.displayStyle = 'none';
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);

  } 

  entregaUpdate(entregaId: number) {

    // tslint:disable-next-line:no-unused-expression
    const response = this.entregaService.readById(entregaId).subscribe(entrega => {
      this.entrega = entrega;

            // tslint:disable-next-line:no-unused-expression
      const response2 = this.carrinhoService.readById(this.entrega.pedido.carrinho.id!).subscribe(carrinho => {
        this.carrinho = carrinho;
        this.carrinho.status = 'Pedido entregue';
        this.atualizarCarrinho(this.carrinho);
      })

      // tslint:disable-next-line:no-unused-expression
      const response3 = this.pedidoService.readById(this.entrega.pedido.id!).subscribe(pedido => {
        this.pedido = pedido;
        this.pedido.status = 'Pedido entregue';
        this.pedido.carrinho = this.carrinho;
        this.atualizarPedido(this.pedido);
        
      })

      this.entrega.pedido = this.pedido;
      this.entrega.data_criacao = new Date();
      this.atualizarEntrega(this.entrega);
    });
  }

  // tslint:disable-next-line:typedef
  async atualizarPedido(pedido: Pedido) {
    const response = await this.pedidoService.update(pedido).subscribe(() => {
      this.pedidoService.showMessage('Pedido Entregue');
    });
  }

  // tslint:disable-next-line:typedef
  async atualizarCarrinho(carrinho: Carrinho) {
    const response1 = await this.carrinhoService.update(carrinho).subscribe(() => {
      this.carrinhoService.showMessage('Pedido Entregue');
    });
  }

  async atualizarEntrega(entrega: Entrega) {
      const response2 =  await this.entregaService.update(entrega).subscribe(() => {
        this.entregaService.showMessage('Pedido Entregue');
    });
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);

  }
}
