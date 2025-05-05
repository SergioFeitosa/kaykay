import { Router } from '@angular/router';
import { Component, OnInit, NgZone, CUSTOM_ELEMENTS_SCHEMA, Injectable, NO_ERRORS_SCHEMA, inject } from '@angular/core';
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
 
@Component({
  selector: 'app-phone-number',
  templateUrl: './phone-number.component.html',
  styleUrls: ['./phone-number.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    NgOtpInputModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

 @Injectable({
   providedIn: 'root'
 })

export class PhoneNumberComponent implements OnInit {

  phoneNumber: any;
  applicationVerifier : any;
  // tslint:disable-next-line:quotemark
  // tslint:disable-next-line:member-ordering
  displayCode = 'none';

  otp!: string;
  verify: any;
  auth: any;
  app: any;
  response: any;

  displayStyle2: string = 'none'
  produto = {} as Produto;

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
    },
  };

  ngOnInit() {

    //firebase.initializeApp(environment.firebaseConfig);

    this.app = firebase.initializeApp(environment.firebaseConfig);
    this.auth = getAuth();
    const db = getFirestore(this.app);
    //this.auth.languageCode = 'pt-Br';
    this.displayCode = 'none';

  }

  async getOtp() {

    //const reCaptchaVerifier = new RecaptchaVerifier(this.auth, 'sign-in-button', { size: 'invisible' })
    // this.applicationVerifier  = new firebase.auth.RecaptchaVerifier(
    //   'sign-in-button', {
    //   'size': 'invisible',
    //   'callback': () => {
    //     // reCAPTCHA solved, proceed with phone number sign-in
    //   },
    //   'expired-callback': () => {
    //     // Response expired, ask user to solve reCAPTCHA again
    //   }
    //   },
    // );

    //const confirmationResult = await signInWithPhoneNumber(this.auth, this.phoneNumber, this.applicationVerifier);
    
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
      //alert('erro')
      interval(1000).subscribe(n => window.location.reload());
    })
  }

  onOtpChange(otp: string) {
    this.otp = otp; 
  }

  handleClick() {

    // console.log(this.otp);
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
          this.router.navigate(['/cardapioPrincipal'])

        });
      })
      .catch((error) => {
        interval(1000).subscribe(n => window.location.reload());
      });
      this.loginService.login()
    }


    openPopup2(produtoId: number): void {
      // tslint:disable-next-line:no-unused-expression
      this.produtoService.readById(produtoId).subscribe(product => {
        this.produto = product;
  
      });
      this.displayStyle2 = 'block';
    }
  
    closePopup2() { 
      this.displayStyle2 = 'none';
      this.navBarService.telefoneOk = true
    }

    
}
