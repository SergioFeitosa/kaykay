import { ActivatedRoute, Router } from '@angular/router';
import { PedidoService } from '../pedido/pedido.service';
import { Component, OnInit } from '@angular/core';
import { Pedido } from '../pedido/pedido';

@Component({
  selector: 'app-pedido-bar-delete',
  templateUrl: './pedidoBar-delete.component.html',
})

export class PedidoBarDeleteComponent implements OnInit {

  pedido = {} as Pedido;


  constructor(private pedidoService: PedidoService,
              private router: Router,
              private activatedRoute: ActivatedRoute
              ) { }

  ngOnInit(): void {

    const id = +this.activatedRoute.snapshot.paramMap.get('id')!;

    this.pedidoService.delete(id).subscribe(() => {
      this.pedidoService.showMessage('Pedido Deletado');
      this.router.navigate(['/pedido']);
    });

  }

  deletePedido(id: number): void {
    this.pedidoService.delete(id).subscribe(() => {
      this.pedidoService.showMessage('Pedido Deletado');
      this.router.navigate(['/pedido']);
    });
  }
}
