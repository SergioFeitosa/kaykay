import { Router } from '@angular/router';
import { PedidoService } from './pedido.service';
import { Component, OnInit } from '@angular/core';
import { Pedido } from './pedido';

@Component({
  selector: 'app-pedido-update',
  templateUrl: './pedido-update.component.html',
})

export class PedidoUpdateComponent implements OnInit {

  pedido = {} as Pedido;

  constructor(private pedidoService: PedidoService,
              private router: Router) { }

  ngOnInit(): void {

  }

  updatePedido(pedido: Pedido): void {
    this.pedidoService.update(pedido).subscribe(() => {
      this.pedidoService.showMessage('Produto Atualizado');
      this.router.navigate(['/pedidos']);
    });
  }
}
