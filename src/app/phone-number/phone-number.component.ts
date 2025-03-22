import { ProdutoListComponent } from './../produto/produto-list.component';
import { Router } from '@angular/router';
import { Component, OnInit, NgZone, CUSTOM_ELEMENTS_SCHEMA, Injectable, NO_ERRORS_SCHEMA } from '@angular/core';
import firebase from 'firebase/compat/app';
import { interval } from 'rxjs';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgOtpInputModule } from 'ng-otp-input';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, updateProfile } from "@angular/fire/auth";
import { environment } from '../../environments/environment.development';

 
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
  auth = getAuth();
  app: any;
  

  
  constructor(
    private router: Router,
    private ngZone: NgZone,
    private produtoListComponent: ProdutoListComponent,
    private navBarComponent: NavBarComponent,
 ) { }

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


    this.app = firebase.initializeApp(environment.firebaseConfig);
    //firebase.initializeApp(environment.firebaseConfig),

    this.auth = getAuth();

    this.verify = JSON.parse(localStorage.getItem('verificationId') || '{}');
    console.log(this.verify);
    this.displayCode = 'none';

  }

  getOTP() {

    alert('passei no getOTP')

    const reCaptchaVerifier = new RecaptchaVerifier(this.auth, 'sign-in-button', { size: 'invisible' })

    alert('passei no 2getOTP')
    alert(this.phoneNumber)


    signInWithPhoneNumber(this.auth,this.phoneNumber, this.reCaptchaVerifier).
      then((confirmationResult) => {
        alert('passei no 3getOTP')
        localStorage.setItem('verificationId',
          JSON.stringify(confirmationResult.verificationId))
        // this.router.navigate(['/code'])
        alert('passei no 4getOTP')
        this.displayCode = 'block';
        alert('passei no 5getOTP')
      }).catch((error) => {
        alert('Número inválido. Tente novamente')
        interval(1000).subscribe(n => window.location.reload());
      })
  }

  onOtpChange(otp: string) {
    alert('passei no 6getOTP')

    this.otp = otp; 
  }

  handleClick() {
    // console.log(this.otp);
    alert('passei no 7getOTP')

    var credential = firebase.auth.PhoneAuthProvider.credential(
      this.verify,
      this.otp
    );

    alert('passei no 8getOTP')

    firebase
      .auth()
      .signInWithCredential(credential)
      .then((response) => {
        localStorage.setItem('user_data', JSON.stringify(response));
        this.ngZone.run(() => {
          environment.login = true;
          environment.telefone = this.phoneNumber;
          this.produtoListComponent.login = true;
          this.navBarComponent.login = true;
          this.produtoListComponent.closePopup2();
          // this.produtoService.carrinhoCreate(produtctId);
          this.router.navigate(['carrinho']);
        });
      })
      .catch((error) => {
        interval(1000).subscribe(n => window.location.reload());
      });
  }
}
