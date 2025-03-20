import { Pedido } from '../pedido/pedido';

export class Conta {

  id?: number = 0;
  pedido!: Pedido;
  quantidade: number = 0;
  valorProdutoUnitario: number = 0;
  valorProdutoTotal: number = 0;
  valorTotal: number = 0;
  releaseDate: Date = new Date();
  releaseTime: string = '';
}
