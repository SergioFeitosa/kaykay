import { Produto } from '../produto/produto';

export interface Carrinho {

  id?: number;
  telefone: number;
  local: string;
  observacao: string;
  quantidade: number;
  isencao: boolean;
  enviado: boolean;
  dataCriacao: Date;
  status: string;
  produto: Produto;
}
