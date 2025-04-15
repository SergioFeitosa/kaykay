
import { NavBarService } from './nav-bar.service';
import { booleanAttribute, Component, inject, Input, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../../environments/environment.development';
import { MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    AngularFireAuthModule,
    CommonModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {

  navbarOpen = false;

  telefone: number = 0;
  codigo: number = 0;
  local: string = '';
  //login: boolean = false;

  displayStyle: string = '';

  userData: any;

  loginService = inject(LoginService);
  navBarService = inject(NavBarService);

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone,
    
  ) { }

  
  ngOnInit(): void {

    this.local = environment.local;

  }


  enviarCodigo(): void {
    // tslint:disable-next-line:comment-format
    //const telefone = this.navForm.get('telefone').value;
    const codigoGerado = Math.random() * this.telefone;
    this.navBarService.enviarCodigo(this.telefone.toString(), codigoGerado.toString());

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
  openPopup(): void {
    // tslint:disable-next-line:no-unused-expression
    this.displayStyle = 'block';
  }

  // tslint:disable-next-line:typedef
  closePopup() {
    this.displayStyle = 'none';
    // tslint:disable-next-line:prefer-const

  }

  logout() {
    return this.afAuth.signOut().then(() => {
      this.navBarService.logout()
      this.ngZone.run(() => {
        this.router.navigate(['']);
      });
    });
  }
    

}

