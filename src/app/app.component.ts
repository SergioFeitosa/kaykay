import { Component } from '@angular/core';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavBarComponent,
    RouterOutlet,
  ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'kaykay';
}
