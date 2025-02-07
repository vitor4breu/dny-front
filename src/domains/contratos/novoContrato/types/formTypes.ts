export type AlunoForm = {
  nome: string;
  sexo: "M" | "F";
};

export type PedidoForm = {
  camisa: {
    possui: boolean;
    cor?: string;
  };
  moletom: {
    possui: boolean;
    cor?: string;
  };
  caneca: {
    possui: boolean;
    tirante: boolean;
  };
  bandeira: {
    possui: boolean;
  };
};

export interface IForm {
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

export const formInitalState: IForm = {
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
