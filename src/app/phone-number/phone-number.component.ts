import { Router } from '@angular/router';
import { Component, OnInit, NgZone, CUSTOM_ELEMENTS_SCHEMA, Injectable, NO_ERRORS_SCHEMA, inject, Output, Input, EventEmitter } from '@angular/core';
import firebase from 'firebase/compat/app';
import { interval } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgOtpInputModule } from 'ng-otp-input';
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { environment } from '../../environments/environment.development';
import { ProdutoService } from '../produto/produto.service';
import { Produto } from '../produto/produto';
import { NavBarService } from '../nav-bar/nav-bar.service';
import { LoginService } from '../services/login.service';
import { getFirestore } from 'firebase/firestore/lite';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
 
@Component({
  selector: 'app-phone-number',
  templateUrl: './phone-number.component.html',
  styleUrls: ['./phone-number.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    NgOtpInputModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    NavBarService
  ]
})

//  @Injectable({
//    providedIn: 'root'
//  })

export class PhoneNumberComponent implements OnInit {

  phoneNumber: any;
  applicationVerifier : any;
  // tslint:disable-next-line:quotemark
  // tslint:disable-next-line:member-ordering
  displayCode = 'none';
  teste = 'teste'
  otp!: string;
  verify: any;
  auth: any;
  app: any;
  response: any;

  displayStyle2: string = 'none'
  produto = {} as Produto;

  @Output() phoneNumberChangeEvent = new EventEmitter<number>();
  
  constructor(
    private router: Router,
    private ngZone: NgZone,
    //private produtoListComponent: ProdutoListComponent,
    //private navBarComponent: NavBarComponent,
    private loginService: LoginService,
    private navBarService: NavBarService,
    private produtoService: ProdutoService,
    

 ) { 

 }

  configCode = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      width: '25px',
      height: '25px',
      color: '#041794',
    },
  };

  currentValue: string = '';

  ngOnInit() {

    //firebase.initializeApp(environment.firebaseConfig);

    this.app = firebase.initializeApp(environment.firebaseConfig);
    this.auth = getAuth();
    const db = getFirestore(this.app);
    //this.auth.languageCode = 'pt-Br';
    this.displayCode = 'none';
  }

  async getOtp() {

    this.applicationVerifier  = new RecaptchaVerifier(this.auth, 'sign-in-button', { size: 'invisible' })

    this.verify = JSON.parse(localStorage.getItem('verificationId') || '{}');

    signInWithPhoneNumber(
      this.auth,
      this.phoneNumber, 
      this.applicationVerifier ,
    ).then((confirmationResult) => {
      window.localStorage.setItem('confirmationResult',
        JSON.stringify(confirmationResult.verificationId))
        environment.telefone = this.phoneNumber
        environment.login = true
        this.displayCode = 'block';
      //this.router.navigate(['/cardapioPrincipal'])
    }).catch((error) => {
      //send sms
      alert('erro no numero do telefone. Tente Novamente!!!')
      this.router.navigate(['/cardapioPrincipal'])
      interval(1000).subscribe(n => window.location.reload());
    })
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
        this.ngZone.run(() => {
          environment.telefone = this.phoneNumber;
          this.navBarService.telefoneOk = true

          this.emitEvent();
          this.router.navigate(['/cardapioPrincipal'])

        });
      })
      .catch((error) => {
        alert('erro no código enviado. Tente Novamente!!!')
        interval(1000).subscribe(n => window.location.reload());
      });
      this.loginService.login()
    }

    emitEvent() {
      this.phoneNumberChangeEvent.emit(this.phoneNumber);
    }


}
