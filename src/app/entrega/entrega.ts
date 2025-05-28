import { Pedido } from '../pedido/pedido';

export interface Entrega {

  id?: number;
  data_criacao: Date;
  pedido: Pedido;
}
