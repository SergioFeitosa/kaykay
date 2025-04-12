import { ProdutoListComponent } from './../produto/produto-list.component';
import { Router } from '@angular/router';
import { Component, OnInit, NgZone, CUSTOM_ELEMENTS_SCHEMA, Injectable, NO_ERRORS_SCHEMA, inject } from '@angular/core';
import firebase from 'firebase/compat/app';
import { interval } from 'rxjs';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgOtpInputModule } from 'ng-otp-input';
import { signInWithPhoneNumber, updateProfile } from "firebase/auth";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import { environment } from '../../environments/environment.prod';

 
@Component({
  selector: 'app-phone-number',
  templateUrl: './phone-number.component.html',
  styleUrls: ['./phone-number.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    NgOtpInputModule,
  ],
  providers: [
    NavBarComponent,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

 @Injectable({
   providedIn: 'root'
 })

export class PhoneNumberComponent implements OnInit {

  phoneNumber: any;
  reCaptchaVerifier: any;
  // tslint:disable-next-line:quotemark
  // tslint:disable-next-line:member-ordering
  displayCode = 'none';

  otp!: string;
  verify: any;
  auth: any;
  app: any;
  response: any;


  constructor(
    private router: Router,
    private ngZone: NgZone,
    //private produtoListComponent: ProdutoListComponent,
    private navBarComponent: NavBarComponent,
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

    firebase.initializeApp(environment.firebaseConfig);

    this.app = firebase.initializeApp(environment.firebaseConfig);

    this.auth = getAuth();
    this.auth.languageCode = 'pt-Br';

    this.reCaptchaVerifier = new RecaptchaVerifier(this.auth, 'sign-in-button', { size: 'invisible' })

    this.verify = JSON.parse(localStorage.getItem('verificationId') || '{}');

    this.displayCode = 'none';


  }

  onSignInSubmit() {

    //const reCaptchaVerifier = new RecaptchaVerifier(this.auth, 'sign-in-button', { size: 'invisible' })

    this.reCaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'sign-in-button', {
      'size': 'invisible',
      'callback': (response:any) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        //this.onSignInSubmit();
      }
    }
  );

    firebase.auth().
    signInWithPhoneNumber(this.phoneNumber, this.reCaptchaVerifier).
      then((confirmationResult) => {
        window.localStorage.setItem('verificationId',
          JSON.stringify(confirmationResult.verificationId))
          environment.telefone = this.phoneNumber
          alert (environment.telefone)
        this.router.navigate(['/code'])
        this.displayCode = 'block';
      }).catch((error) => {
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
          environment.login = true;
          environment.telefone = this.phoneNumber;
          //this.produtoListComponent.login = true;
          this.navBarComponent.login = true;
          //this.produtoListComponent.closePopup2();
          // this.produtoService.carrinhoCreate(produtctId);
          alert('passando')
          //this.router.navigate(['carrinho']);
        });
      })
      .catch((error) => {
        interval(1000).subscribe(n => window.location.reload());
      });
  }
}
