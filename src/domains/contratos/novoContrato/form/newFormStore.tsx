import { create } from "zustand";
import { AlunoForm, PedidoForm } from "../types/formTypes";

interface NewFormState {
  pedido: PedidoForm;
  addPedido: (pedido: PedidoForm) => void;

  alunos: AlunoForm[];
  addAluno: (aluno: AlunoForm) => void;
}

const useNewFormStore = create<NewFormState>((set) => ({
  pedido: {
    camisa: {
      possui: false,
      cor: undefined,
    },
    moletom: {
      possui: false,
      cor: undefined,
    },
    caneca: {
      possui: false,
      tirante: false,
    },
    bandeira: {
      possui: false,
    },
  },
  addPedido: (pedido) => set(() => ({ pedido })),

  alunos: [],
  addAluno: (aluno) => set((state) => ({ alunos: [...state.alunos, aluno] })),
}));

export default useNewFormStore;
