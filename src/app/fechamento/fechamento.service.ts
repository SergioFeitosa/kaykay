import { Injectable } from '@angular/core';
import { Fechamento } from './fechamento';

@Injectable({
  providedIn: 'root',
})

export class FechamentoService {
  retrieveAll(): Fechamento[] {
    return PEDIDOS;
  }
}

const PEDIDOS: Fechamento[] = [
  {
    fechamentoId: 9825512560001,
    produtoId: 1,
    observacao: 'bem passado',
    isencao: false,
    releaseDate: '21/10/2021',
    releaseTime: '10:20'
    },
  {
    fechamentoId: 9825512560001,
    produtoId: 2,
    observacao: 'sem pimenta',
    isencao: false,
    releaseDate: '21/10/2021',
    releaseTime: '10:20'
  },
  {
    fechamentoId: 9825512560001,
    produtoId: 3,
    observacao: '',
    isencao: false,
    releaseDate: '21/10/2021',
    releaseTime: '10:20'
  },
  {
    fechamentoId: 9825512560001,
    produtoId: 4,
    observacao: '',
    isencao: false,
    releaseDate: '21/10/2021',
    releaseTime: '10:20'
  },
  {
    fechamentoId: 9825512560002,
    produtoId: 1,
    observacao: '',
    isencao: false,
    releaseDate: '21/10/2021',
    releaseTime: '10:20'
  },
  {
    fechamentoId: 9825512560002,
    produtoId: 6,
    observacao: '',
    isencao: false,
    releaseDate: '21/10/2021',
    releaseTime: '10:20'
  },
  {
    fechamentoId: 9825512560002,
    produtoId: 7,
    observacao: '',
    isencao: false,
    releaseDate: '21/10/2021',
    releaseTime: '10:20'
  },
  {
    fechamentoId: 9825512560003,
    produtoId: 8,
    observacao: '',
    isencao: false,
    releaseDate: '21/10/2021',
    releaseTime: '10:20'
  },
  {
    fechamentoId: 9825512560004,
    produtoId: 9,
    observacao: '',
    isencao: false,
    releaseDate: '21/10/2021',
    releaseTime: '10:20'
  },
  {
    fechamentoId: 9825512560004,
    produtoId: 10,
    observacao: '',
    isencao: false,
    releaseDate: '21/10/2021',
    releaseTime: '10:20'
  }
];
