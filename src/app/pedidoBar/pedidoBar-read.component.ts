import { Router } from '@angular/router';
import { PedidoService } from '../pedido/pedido.service';
import { Component, OnInit } from '@angular/core';
import { Pedido } from '../pedido/pedido';

@Component({
  selector: 'app-pedido-bar-read',
  templateUrl: './pedidoBar-read.component.html',
})

export class PedidoBarReadComponent implements OnInit {

  pedido = {} as Pedido;

  pedidos: Pedido[] = [];

  constructor(private pedidoService: PedidoService,
              private router: Router) { }

  ngOnInit(): void {

    this.pedidoService.read().subscribe(pedidos => {
      this.pedidos = pedidos;
    });
  }

  createPedido(): void {
    this.pedidoService.create(this.pedido).subscribe(() => {
      this.pedidoService.showMessage('Produto Criaado');
      this.router.navigate(['/pedidos']);
    });
  }
}
