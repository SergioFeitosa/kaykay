import { Router } from '@angular/router';
import { CarrinhoService } from './carrinho.service';
import { Component, OnInit } from '@angular/core';
import { Carrinho } from './carrinho';

@Component({
  selector: 'app-carrinho-create',
  templateUrl: './carrinho-create.component.html',
})

export class CarrinhoCreateComponent implements OnInit {

  carrinho = {} as Carrinho;

  constructor(private carrinhoService: CarrinhoService,
              private router: Router) { }

  ngOnInit(): void {

  }

  createCarrinho(): void {
    this.carrinhoService.create(this.carrinho).subscribe(() => {
      this.carrinhoService.showMessage('Produto Criado');
      this.router.navigate(['/carrinho']);
    });
  }
}
