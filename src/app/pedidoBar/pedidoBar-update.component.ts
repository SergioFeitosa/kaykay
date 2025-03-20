import { Router } from '@angular/router';
import { PedidoService } from '../pedido/pedido.service';
import { Component, OnInit } from '@angular/core';
import { Pedido } from '../pedido/pedido';

@Component({
  selector: 'app-pedido-bar-update',
  templateUrl: './pedidoBar-update.component.html',
})

export class PedidoBarUpdateComponent implements OnInit {

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
