import { Component } from '@angular/core';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { RouterOutlet } from '@angular/router';
import { CaminhoMenuComponent } from './caminho-menu/caminho-menu.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CaminhoMenuComponent,
    NavBarComponent,
    RouterOutlet,

  ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'kaykay';
}
