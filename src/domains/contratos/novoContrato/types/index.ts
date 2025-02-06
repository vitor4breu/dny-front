export interface Representante {
  nome: string;
  sobrenome: string;
  telefone: string;
  principal: boolean;
}

export interface DetalhesPedido {
  possuiCamiseta: boolean;
  possuiMoletom: boolean;
  possuiCaneca: boolean;
  possuiTirante: boolean;
  possuiNomePersonalizado: boolean;
  possuiAssinaturaCapuzMoletom: boolean;
  possuiBandeira: boolean;
}

export interface Endereco {
  cep: string;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
}

export enum TipoEnvio {
  Entrega = 1,
  Retirada = 2,
}

export interface DetalhesEnvio {
  tipo: TipoEnvio;
  endereco: Endereco;
}

export interface Aluno {
  nome: string;
  camisa?: {
    tamanho: number;
    modelagem: number;
    idCor: number;
    nomePersonalizado?: string;
  };
  moletom?: {
    tamanho: number;
    modelagem: number;
    idCor: number;
    assinaturaCapuz: boolean;
    nomePersonalizado?: string;
  };
  caneca?: {
    idCor: number;
    nomePersonalizado?: string;
    tirante: boolean;
  };
}

export interface Cor {
  id: number;
  nome: string;
  hex: string;
}
