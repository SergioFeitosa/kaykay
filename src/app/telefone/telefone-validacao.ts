import { TelefoneConteudo } from './telefone-conteudo';

export interface TelefoneValidacao {

  from: string;
  to: number;
  contents: Array<TelefoneConteudo>;

}
