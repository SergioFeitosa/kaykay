import { Pedido } from '../pedido/pedido';

export interface Entrega {

  id?: number;
  dataCriacao: Date;

  quantidade: number;
  observacao: string;

  pedido: Pedido;
}
