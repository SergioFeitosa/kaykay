
import { CardapioPrincipalService } from './cardapio-principal.service';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { CaminhoMenuComponent } from '../caminho-menu/caminho-menu.component';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-cardapio-principal',
  templateUrl: './cardapio-principal.component.html',
  standalone: true,
  imports: [
    CaminhoMenuComponent,
    CommonModule,
    RouterLink,
  ],
})


export class CardapioPrincipalComponent implements OnInit {

  // modulo: string;

  // tslint:disable-next-line:no-inferrable-types
  buttonDisabled: boolean = false;
  telefone: number = 0;
  codigo: number = 0;
  modulo: string = ''

  // Desktop
  element1!: HTMLElement;
  element2!: HTMLElement;
  element3!: HTMLElement;
  element4!: HTMLElement;
  element5!: HTMLElement;
  element6!: HTMLElement;
  element7!: HTMLElement;
  element8!: HTMLElement;

  // tablet
  element9!: HTMLElement;
  element10!: HTMLElement;
  element11!: HTMLElement;
  element12!: HTMLElement;
  element13!: HTMLElement;
  element14!: HTMLElement;
  element15!: HTMLElement;
  element16!: HTMLElement;

  // Mobile
  element17!: HTMLElement;
  element18!: HTMLElement;
  element19!: HTMLElement;
  element20!: HTMLElement;
  element21!: HTMLElement;
  element22!: HTMLElement;
  element23!: HTMLElement;
  element24!: HTMLElement;

  // Mobile_pequeno
  element25!: HTMLElement;
  element26!: HTMLElement;
  element27!: HTMLElement;
  element28!: HTMLElement;
  element29!: HTMLElement;
  element30!: HTMLElement;
  element31!: HTMLElement;
  element32!: HTMLElement;

  // LAPTOP

  element33!: HTMLElement;
  element34!: HTMLElement;
  element35!: HTMLElement;
  element36!: HTMLElement;
  element37!: HTMLElement;
  element38!: HTMLElement;
  element39!: HTMLElement;
  element40!: HTMLElement;

  constructor(private cardapioPrincipalService: CardapioPrincipalService) {
  }


  ngOnInit(): void {

    this.modulo = 'Cardápio';

    
    environment.login = false;
    
    if (environment.telefone > 0 && environment.codigo > 0) {
      this.telefone = environment.telefone;
      this.codigo = environment.codigo;
      this.updateClassDisabled();
    }

    environment.fundoColoridoCardapio = true;
    environment.fundoColoridoPedido = false;
    environment.fundoColoridoCozinha = false;
    environment.fundoColoridoBar = false;
    environment.fundoColoridoEntrega = false;
    environment.fundoColoridoConta = false;

    this.buttonDisabled = false;
    
  }

  // tslint:disable-next-line:typedef
  updateClassDisabled() {
    this.buttonDisabled = false;
    this.element1 = document.getElementById('desabilitado1') as HTMLElement;
    this.element2 = document.getElementById('desabilitado2') as HTMLElement;
    this.element3 = document.getElementById('desabilitado3') as HTMLElement;
    this.element4 = document.getElementById('desabilitado4') as HTMLElement;
    this.element5 = document.getElementById('desabilitado5') as HTMLElement;
    this.element6 = document.getElementById('desabilitado6') as HTMLElement;
    this.element7 = document.getElementById('desabilitado7') as HTMLElement;
    this.element8 = document.getElementById('desabilitado8') as HTMLElement;
    this.element9 = document.getElementById('desabilitado9') as HTMLElement;


    // this.element1!.removeAttribute('disabled');
    // this.element2!.removeAttribute('disabled');
    // this.element3!.removeAttribute('disabled');
    // this.element4!.removeAttribute('disabled');
    // this.element5!.removeAttribute('disabled');
    // this.element6!.removeAttribute('disabled');
    // this.element7!.removeAttribute('disabled');
    // this.element8!.removeAttribute('disabled');
    // this.element9!.removeAttribute('disabled');
  }

  validarTelefone(): void {

    if (this.telefone > 0) {
      environment.telefone = this.telefone;
      this.enviarCodigo();
    }

  }

  validarCodigo(): void {

    if (this.codigo > 0) {
      environment.codigo = this.codigo;
      // tslint:disable-next-line:semicolon
      this.updateClassDisabled();
    }

  }

  enviarCodigo(): void {
    // tslint:disable-next-line:comment-format
    //const telefone = this.navForm.get('telefone').value;
    const codigoGerado = Math.random() * this.telefone;
    this.cardapioPrincipalService.enviarCodigo(this.telefone.toString(), codigoGerado.toString());
  }


}
