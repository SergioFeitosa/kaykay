import { Router } from '@angular/router';
import { PedidoService } from './pedido.service';
import { Component, OnInit } from '@angular/core';
import { Pedido } from './pedido';

@Component({
  selector: 'app-pedido-read',
  templateUrl: './pedido-read.component.html',
})

export class PedidoReadComponent implements OnInit {

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
