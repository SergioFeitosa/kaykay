import { ActivatedRoute, RouterLink } from '@angular/router';
import { FechamentoService } from './fechamento.service';
import { Fechamento } from './fechamento';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  templateUrl: './fechamento-list.component.html',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterLink
  ]
})

export class FechamentoListComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  _categoryId!: string;

  filteredFechamentos: Fechamento[] = [];
  // tslint:disable-next-line:variable-name
  _fechamentos: Fechamento[] = [];

  // tslint:disable-next-line:variable-name
  _filterBy!: string;

  constructor(private fechamentoService: FechamentoService,
              private activatedRoute: ActivatedRoute ){

  }

  ngOnInit(): void {
    this._fechamentos = this.fechamentoService.retrieveAll();
    this.filteredFechamentos = this._fechamentos;
    environment.telefone = 0;
    environment.codigo = 0;
  }

  // tslint:disable-next-line:typedef
  get filter() {
    return this._filterBy;
  }

  set filter(value: string) {
    this._filterBy = value;

    this.filteredFechamentos =
    this._fechamentos.filter((fechamento: Fechamento) => fechamento.fechamentoId.toString().indexOf(this._filterBy.toString()) > -1);
  }

}
