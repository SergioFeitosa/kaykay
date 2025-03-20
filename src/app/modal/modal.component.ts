import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
  ],
  templateUrl: 'modal.component.html',
  styleUrls: ['modal.component.css'],
})
export class ModalComponent {
  // tslint:disable-next-line:no-inferrable-types
  mostrar: boolean = false;

  // tslint:disable-next-line:typedef
  toggle() {
    this.mostrar = !this.mostrar;
  }
}
