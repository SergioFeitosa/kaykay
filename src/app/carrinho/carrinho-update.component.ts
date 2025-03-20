import { Router } from '@angular/router';
import { CarrinhoService } from './carrinho.service';
import { Component, OnInit } from '@angular/core';
import { Carrinho } from './carrinho';

@Component({
  selector: 'app-carrinho-update',
  templateUrl: './carrinho-update.component.html',
})

export class CarrinhoUpdateComponent implements OnInit {

  carrinho = {} as Carrinho;

  constructor(private carrinhoService: CarrinhoService,
              private router: Router) { }

  ngOnInit(): void {

  }

  updateCarrinho(carrinho: Carrinho): void {
    this.carrinhoService.update(carrinho).subscribe(() => {
      this.carrinhoService.showMessage('Produto Atualizado');
      this.router.navigate(['/carrinho']);
    });
  }
}
