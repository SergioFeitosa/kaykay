export interface Produto {

  id?: number;
  categoria: string;
  nome: string;
  descricao: string;
  codigo: string;
  preco: number;
  imagemUrl: string;
  tempoPreparacao: string;
  avaliacao: number;
  dataCriacao: Date;
}
