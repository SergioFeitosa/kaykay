import { Carrinho } from '../carrinho/carrinho';
import { Produto } from '../produto/produto';

export interface Pedido {

  id?: number;
  telefone: number;
  quantidade: number;
  local: string;
  observacao: string;
  enviado: boolean;
  isencao: boolean;
  dataCriacao: Date;
  status: string;

  produto: Produto;
  
  carrinho: Carrinho;

}
