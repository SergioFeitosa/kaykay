import { Component, OnInit, NgZone } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { Router } from '@angular/router';
import { ProdutoService } from '../produto/produto.service';
import { CarrinhoService } from '../carrinho/carrinho.service';
import { Produto } from '../produto/produto';
import { Carrinho } from '../carrinho/carrinho';
import { environment } from '../../environments/environment.development';
import { NgOtpInputComponent } from 'ng-otp-input';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { timer } from 'rxjs';

@Component({
  selector: 'app-code',
  standalone: true,
  imports: [
    NgOtpInputComponent,
  ],
  providers: [
    NavBarComponent
  ],
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css'],
})
export class CodeComponent implements OnInit {
  otp!: string;
  verify: any;

  // tslint:disable-next-line:variable-name
  produto = {} as Produto;

  // tslint:disable-next-line:variable-name
  carrinho = {} as Carrinho;

  codigo: number = 0;


  constructor(private router: Router,
              private _ngZone: NgZone,
              private produtoService: ProdutoService,
              private carrinhoService: CarrinhoService,
              private navBarComponent: NavBarComponent
) {}

  configCode = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      width: '35px',
      height: '35px',
    },
  };

  ngOnInit() {

    firebase.initializeApp(environment.firebaseConfig);
    this.verify = JSON.parse(localStorage.getItem('verificationId') || '{}');
  }

  onOtpChange(otp: string) {
    this.otp = otp;
  }

  handleClick() {

    var credential = firebase.auth.PhoneAuthProvider.credential(
      this.verify,
      this.otp
    );


    firebase
      .auth()
      .signInWithCredential(credential)
      .then((response) => {
        localStorage.setItem('user_data', JSON.stringify(response));
        this._ngZone.run(() => {
          environment.login = true;
          this.navBarComponent.ngOnInit
          timer(1000).subscribe(x => {
            this.router.navigateByUrl('/navBar', { skipLocationChange: true }).then(() =>
                 this.router.navigate(["carrinho"]));
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
  //     environment.login = true;


  //   }
  // }

  // carrinhoCreate(produtoId: number): void {

  //   // tslint:disable-next-line:no-unused-expression
  //   this.produtoService.readById(produtoId).subscribe(product => {
  //     this.produto = product;

  //     this.carrinho.enviado = false;
  //     this.carrinho.isencao = false;
  //     this.carrinho.local = environment.local;
  //     this.carrinho.data_criacao = new Date();
  //     this.carrinho.telefone = environment.telefone;
  //     this.carrinho.status = 'Pendente';

  //     this.carrinho.produto = this.produto;

  //     this.carrinhoService.create(this.carrinho).subscribe(() => {
  //     this.carrinhoService.showMessage('Produto adicionado no carrinho');

  //     });
  //   });
  // }
}
