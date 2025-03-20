
import { CardapioPrincipalService } from './cardapio-principal.service';
import { Component, NgZone, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ProdutoService } from '../produto/produto.service';
import { environment } from '../../environments/environment.development';
import { CaminhoMenuComponent } from '../caminho-menu/caminho-menu.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cardapio-principal',
  templateUrl: './cardapio-principal.component.html',
  imports: [
    CaminhoMenuComponent,
    CommonModule,
    RouterLink,
  ]
})



export class CardapioPrincipalComponent implements OnInit {



  // modulo: string;

  // tslint:disable-next-line:no-inferrable-types
  buttonDisabled: boolean = false;
  telefone: number = 0;
  codigo: number = 0;


  constructor(
    private cardapioPrincipalService: CardapioPrincipalService,
    private router: Router,    
    private ngZone: NgZone,
    private routerModule: RouterModule,
    private produtoService: ProdutoService
  ) {
  }

  ngOnInit(): void {


  }

  validarTelefone(): void {

    if (this.telefone > 0) {
      environment.telefone = this.telefone;
      this.enviarCodigo();
    }

  }

  validarCodigo(): void {

    if (this.codigo > 0) {
      environment.codigo = this.codigo;
      // tslint:disable-next-line:semicolon
    }

  }

  enviarCodigo(): void {
    // tslint:disable-next-line:comment-format
    //const telefone = this.navForm.get('telefone').value;
    const codigoGerado = Math.random() * this.telefone;
    this.cardapioPrincipalService.enviarCodigo(this.telefone.toString(), codigoGerado.toString());
  }


}
