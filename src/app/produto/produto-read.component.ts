import { Router } from '@angular/router';
import { ProdutoService } from './produto.service';
import { Component, OnInit } from '@angular/core';
import { Produto } from './produto';

@Component({
  selector: 'app-produto-read',
  templateUrl: './produto-read.component.html'
})

export class ProdutoReadComponent implements OnInit {

  produto = {} as Produto;

  produtos!: Produto[];

  constructor(private produtoService: ProdutoService,
              private router: Router) { }

  ngOnInit(): void {

  }

  Leitura(): void {
    this.produtoService.read().subscribe(produtos => {
      this.produtos = produtos;
      console.log('produtos ');
    });
  }

createProduto(): void {
      this.produtoService.create(this.produto).subscribe(() => {
        this.produtoService.showMessage('Produto Criaado');
        this.router.navigate(['/produtos']);
      });
    }
}
