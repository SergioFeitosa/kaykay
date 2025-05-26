import { Produto } from '../produto/produto';

export interface Carrinho {

  id?: number;
  telefone: number;
  local: string;
  observacao: string;
  quantidade: number;
  isencao: boolean;
  enviado: boolean;
  data_criacao: Date;
  status: string;
  produto: Produto;
}
