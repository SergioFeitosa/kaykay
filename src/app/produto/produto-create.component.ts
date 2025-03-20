import { Router } from '@angular/router';
import { ProdutoService } from './produto.service';
import { Component, OnInit } from '@angular/core';
import { Produto } from './produto';

@Component({
  selector: 'app-produto-create',
  templateUrl: './produto-create.component.html',
})

export class ProdutoCreateComponent implements OnInit {


  produto = {} as Produto;

  constructor(private produtoService: ProdutoService,
              private router: Router) { }

  ngOnInit(): void {

  }

  createProduto(): void {
    this.produtoService.create(this.produto).subscribe(() => {
      this.produtoService.showMessage('Produto Criaado');
      this.router.navigate(['/produtos']);
    });
  }
}
