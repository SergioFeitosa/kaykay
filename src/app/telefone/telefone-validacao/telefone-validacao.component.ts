import { TelefoneValidacaoService } from './telefone-validacao.service';
import { TelefoneValidacao } from '../telefone-validacao';
import { Component, OnInit } from '@angular/core';
import { TelefoneConteudo } from '../telefone-conteudo';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-telefone-validacao',
  templateUrl: './telefone-validacao.component.html',
  styleUrls: ['./telefone-validacao.component.scss']
})

export class TelefoneValidacaoComponent implements OnInit {

  telefoneConteudo!: TelefoneConteudo;
  telefoneValidacao!: TelefoneValidacao;

  constructor(
  ) { }

  // tslint:disable-next-line:typedef
  ngOnInit(): void {

  }

  // tslint:disable-next-line:typedef
  enviarCodigo(telefone: string, codigo: string) {

    console.log('enviarCodigo ' + telefone + ' ' + codigo );
    /*
    this.telefoneValidacao.from = 'youthful-sole';
    this.telefoneValidacao.to = +telefone;

    this.telefoneConteudo.type = 'text';
    this.telefoneConteudo.text = +codigo;
    this.telefoneValidacao.contents.push(this.telefoneConteudo);

    environment.codigo = +codigo;

    this.telefoneValidacaoService.create(this.telefoneValidacao).subscribe(() => {
      this.telefoneValidacaoService.showMessage('Codigo Enviado');
    });
    */
  }
}
