
import { NavBarService } from './nav-bar.service';
import { booleanAttribute, Component, CUSTOM_ELEMENTS_SCHEMA, inject, Input, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../../environments/environment.development';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { LoginService } from '../services/login.service';
import { PhoneNumberComponent } from '../phone-number/phone-number.component';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    AngularFireAuthModule,
    CommonModule,
    MatIconModule,
    RouterLink,
    PhoneNumberComponent

  ],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class NavBarComponent implements OnInit {

  navbarOpen = false;
  phoneNumber: any;
  reCaptchaVerifier: any;

  telefone: number = 0;
  codigo: number = 0;
  local: string = '';
  //login: boolean = false;

  login: boolean = false;

  userData: any;

  loginService = inject(LoginService);
  navBarService = inject(NavBarService);


  otp!: string;
  flag!: boolean;

  verify: any;

  telefoneValue: number = 0;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone,

  ) {
  }

  currentValue: string = '';

  ngOnInit(): void {

    firebase.initializeApp(environment.firebaseConfig);

    this.local = environment.local;

  }

  // tslint:disable-next-line:typedef
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  // tslint:disable-next-line:typedef
  Ajuda() {
    this.navbarOpen = !this.navbarOpen;
  }


  // tslint:disable-next-line:typedef
  onOtpChange(otp: string) {
    this.otp = otp;
  }

  // getOTP() {

  //   this.reCaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', { size: 'invisible' });

  //   firebase.
  //     auth().
  //     signInWithPhoneNumber(this.phoneNumber, this.reCaptchaVerifier).
  //     then((confirmationResult) => {
  //       this.login = environment.login;
  //       window.localStorage.setItem('verificationId',
  //         JSON.stringify(confirmationResult.verificationId));
  //       //this.router.navigate(['/code']);
  //       //this.validarCodigo(this.produto.id);
  //     }).catch((error) => {
  //       setTimeout(() => {
  //         window.location.reload();
  //       }, 5000);
  //     });
  // }



  // tslint:disable-next-line:quotemark
  // tslint:disable-next-line:member-ordering
  displayStyle = 'none';

  // tslint:disable-next-line:typedef
  openPopup(): void {
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
  openPopup2(): void {
    this.displayStyle2 = 'block';
  }

  // tslint:disable-next-line:typedef
  closePopup2() {
    this.displayStyle = 'none';
    this.displayStyle2 = 'none';
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);

  }

  validarTelefone(): void {

    if (this.telefone > 0) {
      environment.telefone = this.telefone;
      this.enviarCodigo();
    }
  }



  enviarCodigo(): void {
    // tslint:disable-next-line:comment-format
    //const telefone = this.navForm.get('telefone').value;
    const codigoGerado = Math.random() * this.telefone;
    this.navBarService.enviarCodigo(this.telefone.toString(), codigoGerado.toString());

  }

  validarCodigo(): void {

    // tslint:disable-next-line:semicolon
    // this.updateClassDisabled();  
    this.closePopup2();
    this.closePopup();

  }

  logout() {
    return this.afAuth.signOut().then(() => {
      this.loginService.logout()
      this.ngZone.run(() => {
        this.router.navigate(['']);
      });
    });
  }



  phone() {
    return this.afAuth.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigate(['/phone']);
      });
    });
  }

  handleEvent(event: number) {
    this.telefone = event;
    this.phoneNumber = event;
    this.closePopup2();

  }

}

