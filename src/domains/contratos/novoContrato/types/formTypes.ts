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
