import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProdutoService } from './produto.service';
import { Component, NgZone, OnInit } from '@angular/core';
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
  ]
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

  // tslint:disable-next-line:variable-name
  _filterBy: string = '';

  otp!: string;
  flag!: boolean;

  verify: any;

  constructor(
    private produtoService: ProdutoService,
    private carrinhoService: CarrinhoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,
    private caminhoMenuComponent: CaminhoMenuComponent,
  ) { }

  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      width: '30px',
      height: '30px',
    },
  };

  ngOnInit(): void {

    // this.modulo = 'Cardápio';

    console.log('produto list init' )


    firebase.initializeApp(environment.firebaseConfig);

    this.carrinho.quantidade = 1;

    this.telefone = environment.telefone;
    this.login = environment.login;
    this.flag = false;

    environment.fundoColoridoCardapio = true;
    environment.fundoColoridoPedido = false;
    environment.fundoColoridoCozinha = false;
    environment.fundoColoridoBar = false;
    environment.fundoColoridoEntrega = false;
    environment.fundoColoridoConta = false;

    this._categoryId = this.activatedRoute.snapshot.paramMap.get('categoryId');

    this.produtoService.read().subscribe(produto => {
      this.produtos = produto.filter((produto: Produto) =>
        produto.category ==  this._categoryId);
      this.filteredProdutos = this.produtos;
    });

    this.verify = JSON.parse(localStorage.getItem('verificationId') || '{}');
    // console.log(this.verify);

  }

    // tslint:disable-next-line:typedef
    onOtpChange(otp: string) {
      this.otp = otp;
    }
  
    // tslint:disable-next-line:typedef
    handleClick(produtoId: number) {
      // tslint:disable-next-line:prefer-const
      const credential = firebase.auth.PhoneAuthProvider.credential(
        this.verify,
        this.otp
      );
  
      console.log(credential);
      firebase
        .auth()
        .signInWithCredential(credential)
        .then((response) => {
          localStorage.setItem('user_data', JSON.stringify(response));
          this.ngZone.run(() => {
            // this.router.navigate(['/carrinho']);
            this.validarCodigo(produtoId);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  
  
  getOTP() {
    this.reCaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', { size: 'invisible' });

    firebase.
      auth().
      signInWithPhoneNumber(this.phoneNumber, this.reCaptchaVerifier).
      then((confirmationResult) => {
    this.login = environment.login;
    window.localStorage.setItem('verificationId',
        JSON.stringify(confirmationResult.verificationId));
        //this.router.navigate(['/code']);
        //this.validarCodigo(this.produto.id);
      }).catch((error) => {
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      });
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
      this.produtos.filter((produto: Produto) =>
        produto.name.toLocaleLowerCase().indexOf(this._filterBy.toLocaleLowerCase()) > -1);
  }

  // tslint:disable-next-line:quotemark
  // tslint:disable-next-line:member-ordering
  displayStyle = 'none';

  // tslint:disable-next-line:typedef
  openPopup(produtoId: number): void {

    console.log('open popup')

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

  // tslint:disable-next-line:quotemark
  // tslint:disable-next-line:member-ordering
  displayStyle2 = 'none';

  // tslint:disable-next-line:typedef
  openPopup2(produtoId: number): void {

    // tslint:disable-next-line:no-unused-expression
    this.produtoService.readById(produtoId).subscribe(product => {
      this.produto = product;

    });
    this.displayStyle2 = 'block';
  }

  // tslint:disable-next-line:typedef
  closePopup2() { 
    this.displayStyle = 'none';
    this.displayStyle2 = 'none';
  }

  carrinhoCreate(produtoId: number): void {

    console.log('criar o carrinho')

    // tslint:disable-next-line:no-unused-expression
    this.produtoService.readById(produtoId).subscribe(product => {
      this.produto = product;

      this.carrinho.enviado = false;
      this.carrinho.isencao = false;
      this.carrinho.local = environment.local;
      this.carrinho.dataCriacao = new Date();

      //environment.telefone = 5511982551256
      alert('telefone 3 '+ environment.telefone)

      this.carrinho.telefone = environment.telefone;

      this.carrinho.status = 'Pendente';
      this.carrinho.produto = this.produto;

      this.carrinhoService.create(this.carrinho).subscribe(() => {
        this.carrinhoService.showMessage('Produto adicionado no pedido');
      });
    });

    this.closePopup();
  }

  validarTelefone(): void {

    if (this.telefone > 0) {
      environment.telefone = this.telefone;
      this.enviarCodigo();
    }
  }

  validarCodigo(produtoId: number): void {

    console.log('criar um carrinhho')

    // tslint:disable-next-line:no-unused-expression
    this.produtoService.readById(produtoId).subscribe(product => {
      this.produto = product;

    });

    if (environment.codigo > 0) {
      environment.codigo = this.codigo;
      // tslint:disable-next-line:semicolon
      // this.updateClassDisabled();
      console.log('criar um carrinhho')
      this.carrinhoCreate(produtoId);
      console.log('criou um carrinhho')

      this.closePopup2();
      // window.alert('Logged in');
      this.closePopup();


    }
  }

  enviarCodigo(): void {
    // tslint:disable-next-line:comment-format
    //const telefone = this.navForm.get('telefone').value;
    const codigoGerado = Math.random() * this.telefone;
  }

  // tslint:disable-next-line:typedef
  updateClassDisabled() {
    this.buttonDisabled = false;
    this.element1 = document.getElementById('desabilitado1') as HTMLElement;
    this.element2 = document.getElementById('desabilitado2') as HTMLElement;
    this.element3 = document.getElementById('desabilitado3') as HTMLElement;
    this.element4 = document.getElementById('desabilitado4') as HTMLElement;
    this.element5 = document.getElementById('desabilitado5') as HTMLElement;
    this.element6 = document.getElementById('desabilitado6') as HTMLElement;
    this.element7 = document.getElementById('desabilitado7') as HTMLElement;
    this.element8 = document.getElementById('desabilitado8') as HTMLElement;

    this.element1.removeAttribute('disabled');
    this.element2.removeAttribute('disabled');
    this.element3.removeAttribute('disabled');
    this.element4.removeAttribute('disabled');
    this.element5.removeAttribute('disabled');
    this.element6.removeAttribute('disabled');
    this.element7.removeAttribute('disabled');
    this.element8.removeAttribute('disabled');
  }



}
