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
  possuiTiranteCaneca: boolean;
  nomeAluno: string;
  nomePersonalizadoCamisa: string;
  nomePersonalizadoMoletom: string;
  nomePersonalizadoCaneca: string;
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
  possuiTiranteCaneca: false,
  nomeAluno: "",
  nomePersonalizadoCamisa: "",
  nomePersonalizadoMoletom: "",
  nomePersonalizadoCaneca: "",
};
