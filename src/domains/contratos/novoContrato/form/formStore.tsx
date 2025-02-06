import {
  Aluno,
  Cor,
  DetalhesEnvio,
  DetalhesPedido,
  Endereco,
  Representante,
  TipoEnvio,
} from "../types";
import { create } from "zustand";

const defaultRepresentantesPedido: Representante[] = [
  {
    nome: "Vitor",
    sobrenome: "Abreu da Silva",
    telefone: "51985203768",
    principal: true,
  },
];

const defaultDetalhesPedido: DetalhesPedido = {
  possuiCamiseta: true,
  possuiMoletom: true,
  possuiCaneca: true,
  possuiTirante: true,
  possuiNomePersonalizado: true,
  possuiAssinaturaCapuzMoletom: true,
  possuiBandeira: true,
};

const defaultDetalhesEnvioPedido: DetalhesEnvio = {
  tipo: TipoEnvio.Retirada,
  endereco: {
    cep: "",
    rua: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
  },
};

const obterDefaultAluno = (detalhesPedido: DetalhesPedido): Aluno => ({
  nome: "",
  camisa: detalhesPedido.possuiCamiseta ? ({} as any) : undefined,
  moletom: detalhesPedido.possuiMoletom ? ({} as any) : undefined,
  caneca: detalhesPedido.possuiCaneca ? ({} as any) : undefined,
});

const defaultAlunosPedido: Aluno[] = [
  {
    nome: "ALUNO TESTE 1",
    camisa: {
      tamanho: 4,
      modelagem: 1,
      idCor: 7,
      nomePersonalizado: "NOME PERSONALIZADO",
    },
    moletom: {
      tamanho: 2,
      modelagem: 1,
      nomePersonalizado: "NOME PERSONALIZADO",
      idCor: 1,
      assinaturaCapuz: true,
    },
    caneca: {
      tirante: true,
      nomePersonalizado: "NOME PERSONALIZADO",
    },
  },
  {
    nome: "ALUNO TESTE 2",
    camisa: {
      tamanho: 1,
      modelagem: 2,
      idCor: 4,
      nomePersonalizado: "NOME PERSONALIZADO 2",
    },
    moletom: {
      tamanho: 1,
      modelagem: 2,
      nomePersonalizado: "NOME PERSONALIZADO DASDAS",
      idCor: 5,
      assinaturaCapuz: true,
    },
    caneca: {
      tirante: true,
      nomePersonalizado: "NOME PERSONALIZADO ADAS",
    },
  },
];

interface FormState {
  escolaInput: { escola: string; error?: string };
  setEscolaInput: (input: { escola: string; error?: string }) => void;

  representantes: Representante[];
  setRepresentantes: (representantes: Representante[]) => void;
  handleAddRepresentante: () => void;
  handleRemoveRepresentante: (index: number) => void;

  detalhesPedido: DetalhesPedido;
  setDetalhesPedido: (detalhes: DetalhesPedido) => void;

  detalhesEnvio: DetalhesEnvio;
  setDetalhesEnvio: (envio: DetalhesEnvio) => void;
  updateEndereco: (field: keyof Endereco, value: string) => void;

  alunos: Aluno[];
  addAluno: (aluno: Aluno) => void;
  setAlunos: (alunos: Aluno[]) => void;
  handleAddAluno: () => void;
  handleRemoveAluno: (index: number) => void;
  updateAluno: (index: number, field: keyof Aluno, value: any) => void;

  coresMoletom: Cor[];
  setCoresMoletom: (cores: Cor[]) => void;

  coresCamisa: Cor[];
  setCoresCamisa: (cores: Cor[]) => void;
}

const useFormStore = create<FormState>((set) => ({
  escolaInput: { escola: "Exito Alvorada" },
  setEscolaInput: (input) => set({ escolaInput: input }),

  representantes: defaultRepresentantesPedido,
  setRepresentantes: (representantes) => set({ representantes }),
  handleAddRepresentante: () =>
    set((state) => ({
      representantes: [
        ...state.representantes,
        {
          nome: "",
          sobrenome: "",
          telefone: "",
          principal: false,
        } as Representante,
      ],
    })),
  handleRemoveRepresentante: (index) =>
    set((state) => ({
      representantes: state.representantes.filter((_, i) => i !== index),
    })),

  detalhesPedido: defaultDetalhesPedido,
  setDetalhesPedido: (detalhes) => set({ detalhesPedido: detalhes }),

  detalhesEnvio: defaultDetalhesEnvioPedido,
  setDetalhesEnvio: (envio) => set({ detalhesEnvio: envio }),
  updateEndereco: (field, value) =>
    set((state) => ({
      detalhesEnvio: {
        ...state.detalhesEnvio,
        endereco: {
          ...state.detalhesEnvio.endereco,
          [field]: value,
        },
      },
    })),

  alunos: [],
  setAlunos: (alunos) => set({ alunos }),
  addAluno: (aluno) =>
    set((state) => ({
      alunos: [...state.alunos, aluno],
    })),
  handleAddAluno: () =>
    set((state) => ({
      alunos: [...state.alunos, obterDefaultAluno(state.detalhesPedido)],
    })),
  handleRemoveAluno: (index) =>
    set((state) => ({ alunos: state.alunos.filter((_, i) => i !== index) })),
  updateAluno: (index, field, value) =>
    set((state) => ({
      alunos: state.alunos.map((aluno, i) =>
        i === index ? { ...aluno, [field]: value } : aluno
      ),
    })),
  coresMoletom: [],
  setCoresMoletom: (cores) => set({ coresMoletom: cores }),

  coresCamisa: [],
  setCoresCamisa: (cores) => set({ coresCamisa: cores }),
}));

export default useFormStore;
