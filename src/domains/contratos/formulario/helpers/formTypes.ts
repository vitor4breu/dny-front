export interface IAlunoForm {
  possuiCamiseta: boolean;
  modeloCamiseta: string;
  tamanhoCamiseta: string;
  corCamiseta: string;
  possuiMoletom: boolean;
  modeloMoletom: string;
  tamanhoMoletom: string;
  corMoletom: string;
  possuiAssinaturaMoletom: boolean;
  possuiCaneca: boolean;
  corCaneca: string;
  possuiTiranteCaneca: boolean;
  nomeAluno: string;
  nomePersonalizadoCamiseta: string;
  nomePersonalizadoMoletom: string;
  nomePersonalizadoCaneca: string;
  possuiNomePersonalizadoCamiseta: boolean;
  possuiNomePersonalizadoMoletom: boolean;
  possuiNomePersonalizadoCaneca: boolean;
}

export const alunoFormInitalState: IAlunoForm = {
  possuiCamiseta: true,
  modeloCamiseta: "",
  tamanhoCamiseta: "",
  corCamiseta: "",
  possuiMoletom: false,
  modeloMoletom: "",
  tamanhoMoletom: "",
  corMoletom: "",
  possuiAssinaturaMoletom: false,
  possuiCaneca: false,
  corCaneca: "",
  possuiTiranteCaneca: false,
  nomeAluno: "",
  nomePersonalizadoCamiseta: "",
  nomePersonalizadoMoletom: "",
  nomePersonalizadoCaneca: "",
  possuiNomePersonalizadoCamiseta: false,
  possuiNomePersonalizadoMoletom: false,
  possuiNomePersonalizadoCaneca: false,
};

export interface IPedidoForm {
  nomeEscola: string;
  idRep1: number;
  nomeRep1: string;
  sobrenomeRep1: string;
  telefoneRep1: string;
  principalRep1: boolean;
  idRep2: number;
  nomeRep2?: string;
  sobrenomeRep2: string;
  telefoneRep2: string;
  principalRep2: boolean;
  possuiBandeira: boolean;
  dataEntrega: string;
  tipoEntrega: 1 | 2;
  cep?: string;
  rua?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  [key: string]: any;
}

export const pedidoFormInitalState: IPedidoForm = {
  nomeEscola: "",
  idRep1: -1,
  nomeRep1: "",
  sobrenomeRep1: "",
  telefoneRep1: "",
  principalRep1: false,
  idRep2: -1,
  nomeRep2: "",
  sobrenomeRep2: "",
  telefoneRep2: "",
  principalRep2: false,
  possuiBandeira: false,
  dataEntrega: "",
  tipoEntrega: 1,
  cep: "",
  rua: "",
  numero: "",
  complemento: "",
  bairro: "",
  cidade: "",
  estado: "",
};
