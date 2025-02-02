export interface ContractInfo {
    id: number;
    escola: string;
    nomeResponsavel: string;
    detalhesPedido: Record<string, boolean>;
    alunos: any[];
    detalhesEnvio: {
      tipo: string;
    };
  }
  
  export interface ContractDetailsDrawerProps {
    contratoInfo: ContractInfo | null;
    onClose: () => void;
  }