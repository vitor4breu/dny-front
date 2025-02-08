import { Aluno, Cor } from ".";
import { create } from "zustand";
import { IPedidoForm, pedidoFormInitalState } from "./formTypes";

const defaultAluno: Aluno = {
  nome: "",
};

interface FormState {
  alunos: Aluno[];
  addAluno: (aluno: Aluno) => void;
  setAlunos: (alunos: Aluno[]) => void;
  handleRemoveAluno: (index: number) => void;
  updateAluno: (index: number, aluno: Aluno) => void;

  coresMoletom: Cor[];
  setCoresMoletom: (cores: Cor[]) => void;

  coresCamisa: Cor[];
  setCoresCamisa: (cores: Cor[]) => void;

  coresCaneca: Cor[];
  setCoresCaneca: (cores: Cor[]) => void;

  selectedItem: [number, Aluno];
  setSelectedItem: (id: number, aluno: Aluno) => void;

  pedido: IPedidoForm;
  setPedido: (pedido: IPedidoForm) => void;
  clearPedido: () => void;
}

const useFormStore = create<FormState>((set) => ({
  alunos: [],
  setAlunos: (alunos) => set({ alunos }),
  addAluno: (aluno) =>
    set((state) => ({
      alunos: [...state.alunos, aluno],
    })),
  handleRemoveAluno: (index) =>
    set((state) => ({ alunos: state.alunos.filter((_, i) => i !== index) })),
  updateAluno: (index, newAluno) =>
    set((state) => ({
      alunos: state.alunos.map((aluno, i) => (i === index ? newAluno : aluno)),
    })),
  coresMoletom: [],
  setCoresMoletom: (cores) => set({ coresMoletom: cores }),

  coresCamisa: [],
  setCoresCamisa: (cores) => set({ coresCamisa: cores }),

  coresCaneca: [],
  setCoresCaneca: (cores) => set({ coresCaneca: cores }),

  selectedItem: [0, defaultAluno],
  setSelectedItem: (id: number, aluno: Aluno) =>
    set({ selectedItem: [id, aluno] }),

  pedido: pedidoFormInitalState,
  setPedido: (pedido) => set({ pedido }),
  clearPedido: () => set({ pedido: pedidoFormInitalState }),
}));

export default useFormStore;
