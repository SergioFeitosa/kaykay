import { Router } from '@angular/router';
import { PedidoService } from './pedido.service';
import { Component, OnInit } from '@angular/core';
import { Pedido } from './pedido';

@Component({
  selector: 'app-pedido-create',
  templateUrl: './pedido-create.component.html',
})

export class PedidoCreateComponent implements OnInit {

  pedido = {} as Pedido;

  constructor(private pedidoService: PedidoService,
              private router: Router) { }

  ngOnInit(): void {

  }

  createPedido(): void {
    this.pedidoService.create(this.pedido).subscribe(() => {
      this.pedidoService.showMessage('Produto Criaado');
      this.router.navigate(['/pedidos']);
    });
  }
}
