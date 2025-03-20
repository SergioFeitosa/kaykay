import { Router } from '@angular/router';
import { PedidoService } from '../pedido/pedido.service';
import { Component, OnInit } from '@angular/core';
import { Pedido } from '../pedido/pedido';

@Component({
  selector: 'app-pedido-bar-create',
  templateUrl: './pedidoBar-create.component.html',
})

export class PedidoBarCreateComponent implements OnInit {

  pedido = {} as Pedido;

  constructor(private pedidoService: PedidoService,
              private router: Router) { }

  ngOnInit(): void {
    
  }

  createPedido(): void {
    this.pedidoService.create(this.pedido).subscribe(() => {
      this.pedidoService.showMessage('Produto Criado');
      this.router.navigate(['/pedidos']);
    });
  }
}
