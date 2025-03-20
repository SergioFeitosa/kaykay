import { ActivatedRoute, Router } from '@angular/router';
import { CarrinhoService } from './carrinho.service';
import { Component, OnInit } from '@angular/core';
import { Carrinho } from './carrinho';

@Component({
  selector: 'app-carrinho-delete',
  templateUrl: './carrinho-delete.component.html',
})

export class CarrinhoDeleteComponent implements OnInit {

  carrinho = {} as Carrinho;

  constructor(private carrinhoService: CarrinhoService,
              private router: Router,
              private activatedRoute: ActivatedRoute
              ) { }

  ngOnInit(): void {

    const id = +this.activatedRoute.snapshot.paramMap.get('id')!;

    this.carrinhoService.delete(id).subscribe(() => {
      this.carrinhoService.showMessage('Carrinho Deletado');
      this.router.navigate(['/carrinho']);
    });

  }

  deleteCarrinho(id: number): void {
    this.carrinhoService.delete(id).subscribe(() => {
      this.carrinhoService.showMessage('Carrinho Deletado');
      this.router.navigate(['/carrinho']);
    });
  }
}
