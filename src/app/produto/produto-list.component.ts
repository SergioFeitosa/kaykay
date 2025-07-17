import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProdutoService } from './produto.service';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, NgZone, OnInit } from '@angular/core';
import { Produto } from './produto';
import { CarrinhoService } from '../carrinho/carrinho.service';
import { Carrinho } from '../carrinho/carrinho';

import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { CaminhoMenuComponent } from '../caminho-menu/caminho-menu.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StarComponent } from '../star/star.component';
import { PhoneNumberComponent } from '../phone-number/phone-number.component';
import { environment } from '../../environments/environment.development';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  standalone: true,
  imports: [
    CaminhoMenuComponent,
    FormsModule,
    CommonModule,
    StarComponent,
    PhoneNumberComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ProdutoListComponent implements OnInit {

  phoneNumber: any;
  reCaptchaVerifier: any;

  buttonDisabled: boolean = false;
  telefone: number = 0;
  codigo: number = 0;
  element1?: HTMLElement;
  element2?: HTMLElement;
  element3?: HTMLElement;
  element4?: HTMLElement;
  element5?: HTMLElement;
  element6?: HTMLElement;
  element7?: HTMLElement;
  element8?: HTMLElement;


  login: boolean = false;

  // tslint:disable-next-line:variable-name
  _categoryId: any = null;

  modulo: string = '';

  // tslint:disable-next-line:variable-name
  produto = {} as Produto;

  // tslint:disable-next-line:variable-name
  carrinho = {} as Carrinho;

  produtos: Produto[] = [];

  filteredProdutos: Produto[] = [];

  // tslint:disable-next-line:variable-name  
  _produtos: Produto[] = [];

  // tslint:disable-next-line:variable-name
  _filterBy: string = '';

  otp!: string;
  flag!: boolean;

  verify: any;

  loginService = inject(LoginService);

  constructor(
    private produtoService: ProdutoService,
    private carrinhoService: CarrinhoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,
    private caminhoMenuComponent: CaminhoMenuComponent,
  ) { }

  // config = {
  //   allowNumbersOnly: true,
  //   length: 6,
  //   isPasswordInput: false,
  //   disableAutoFocus: false,
  //   placeholder: '',
  //   inputStyles: {
  //     width: '30px',
  //     height: '30px',
  //   },
  // };

  sortedProducts: any[] = [];

  ngOnInit(): void {

    // this.modulo = 'Cardápio';

    firebase.initializeApp(environment.firebaseConfig);

    this.carrinho.quantidade = 1;

    this.telefone = environment.telefone;
    this.login = this.loginService.getUserLogin();
    this.flag = false;

    environment.fundoColoridoCardapio = true;
    environment.fundoColoridoPedido = false;
    environment.fundoColoridoCozinha = false;
    environment.fundoColoridoBar = false;
    environment.fundoColoridoEntrega = false;
    environment.fundoColoridoConta = false;

    this._categoryId = this.activatedRoute.snapshot.paramMap.get('categoryId');

    this.produtoService.read().subscribe(produto => {
      this.produtos = produto
        .filter((produto: Produto) => produto.categoria == this._categoryId)
      this.filteredProdutos = this.produtos;
      this.sortProductsByName();

    });

  }

  sortProductsByName() {
    this.sortedProducts = [...this.filteredProdutos].sort((a, b) => a.nome.localeCompare(b.nome));
  }

  sortProductsByPrice() {
    this.sortedProducts = [...this.filteredProdutos].sort((a, b) => a.preco - b.preco);
  }


  // tslint:disable-next-line:typedef
  onOtpChange(otp: string) {
    this.otp = otp;
  }

  // tslint:disable-next-line:typedef
  minus() {
    if (this.carrinho.quantidade !== 1) {
      this.carrinho.quantidade--;
    }
  }

  // tslint:disable-next-line:typedef
  plus() {
    if (this.carrinho.quantidade !== 10) {
      this.carrinho.quantidade++;
    }
  }



  // tslint:disable-next-line:typedef
  get filter() {
    return this._filterBy;
  }

  set filter(value: string) {
    this._filterBy = value;

    this.filteredProdutos =
      this.produtos
        .filter((produto: Produto) => produto.nome.toLocaleLowerCase().indexOf(this._filterBy.toLocaleLowerCase()) > -1);

    this.sortProductsByName();        

  }

  // tslint:disable-next-line:quotemark
  // tslint:disable-next-line:member-ordering
  displayStyle = 'none';

  // tslint:disable-next-line:quotemark
  // tslint:disable-next-line:member-ordering
  displayStyle2 = 'none';

  // tslint:disable-next-line:typedef
  openPopup(produtoId: number): void {

    // tslint:disable-next-line:no-unused-expression
    this.produtoService.readById(produtoId).subscribe(product => {
      this.produto = product;

    });

    this.displayStyle = 'block';
  }

  // tslint:disable-next-line:typedef
  closePopup() {
    this.displayStyle = 'none';
  }


  // tslint:disable-next-line:typedef
  openPopup2(produtoId: number): void {
    this.displayStyle2 = 'block';
  }

  // tslint:disable-next-line:typedef
  closePopup2() {
    //this.carrinhoCreate(this.produto.id!);
    this.displayStyle2 = 'none';
  }

  async carrinhoCreate(produtoId: number): Promise<void> {

    // tslint:disable-next-line:no-unused-expression
    this.produtoService.readById(produtoId).subscribe(product => {
      this.produto = product;

      this.carrinho.enviado = false
      this.carrinho.isencao = false;
      this.carrinho.local = environment.local;
      this.carrinho.data_criacao = new Date();

      this.carrinho.telefone = +environment.telefone;

      this.carrinho.status = 'Pendente';
      this.carrinho.produto = this.produto;

      this.carrinhoService.create(this.carrinho).subscribe(() => {
        this.carrinhoService.showMessage('Produto adicionado no carrinho');
      });
      this.router.navigate(['/carrinho']);
    });

    //    this.closePopup();
  }

  // validarTelefone(): void {

  //   if (this.telefone > 0) {
  //     environment.telefone = this.telefone;
  //     this.enviarCodigo();
  //   }
  // }

  // validarCodigo(produtoId: number): void {

  //   // tslint:disable-next-line:no-unused-expression
  //   this.produtoService.readById(produtoId).subscribe(product => {
  //     this.produto = product;

  //   });

  //   if (environment.codigo > 0) {
  //     environment.codigo = this.codigo;
  //     // tslint:disable-next-line:semicolon
  //     // this.updateClassDisabled();
  //     this.carrinhoCreate(produtoId);

  //     this.closePopup2();
  //     this.closePopup();


  //   }
  // }

  // enviarCodigo(): void {
  //   // tslint:disable-next-line:comment-format
  //   //const telefone = this.navForm.get('telefone').value;
  //   const codigoGerado = Math.random() * this.telefone;
  // }

  // // tslint:disable-next-line:typedef
  // updateClassDisabled() {
  //   this.buttonDisabled = false;
  //   this.element1 = document.getElementById('desabilitado1') as HTMLElement;
  //   this.element2 = document.getElementById('desabilitado2') as HTMLElement;
  //   this.element3 = document.getElementById('desabilitado3') as HTMLElement;
  //   this.element4 = document.getElementById('desabilitado4') as HTMLElement;
  //   this.element5 = document.getElementById('desabilitado5') as HTMLElement;
  //   this.element6 = document.getElementById('desabilitado6') as HTMLElement;
  //   this.element7 = document.getElementById('desabilitado7') as HTMLElement;
  //   this.element8 = document.getElementById('desabilitado8') as HTMLElement;

  //   this.element1.removeAttribute('disabled');
  //   this.element2.removeAttribute('disabled');
  //   this.element3.removeAttribute('disabled');
  //   this.element4.removeAttribute('disabled');
  //   this.element5.removeAttribute('disabled');
  //   this.element6.removeAttribute('disabled');
  //   this.element7.removeAttribute('disabled');
  //   this.element8.removeAttribute('disabled');
  // }

  handleEvent(event: number) {
    this.carrinhoCreate(this.produto.id!);
    this.router.navigate(['/carrinho']);

  }


}
