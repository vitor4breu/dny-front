import axios from 'axios';
import { ContratoModel } from 'models/contrato/Contrato';
import { Paginacao } from 'types/extended';
import contratosMock from './mock';
import { TipoEnvio } from 'domains/contratos/novoContrato/types';
import api from '@utils/api/apiConfig';

const contratos = contratosMock;



export interface ContractRequest {
    escola: string; // Move to contract level
    possuiBandeira: boolean;
    representantes: {
      nome: string;
      sobrenome: string;
      telefone: string;
    }[];
    detalhesEnvio: {
      tipo: TipoEnvio;
      endereco: {
        cep: string;
        rua: string;
        numero: string;
        complemento: string;
        bairro: string;
        cidade: string;
        estado: string;
      };
    };
    alunos: {
      nome: string;
      tamanhoCamiseta?: string;
      tipoCamiseta?: string;
      tamanhoMoletom?: string;
      tipoMoletom?: string;
      nomePersonalizado?: string;
      possuiAssinaturaCapuzMoletom?: boolean;
      possuiCaneca?: boolean;
      possuiTirante?: boolean;
    }[];
}


  export interface ContractResponse extends ContratoModel {
    createdAt: string;
    status: string;
  }

  export class ContractApiError extends Error {
    constructor(message: string, public statusCode?: number) {
      super(message);
      this.name = 'ContractApiError';
    }
  }
  
  export class ValidationError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'ValidationError';
    }
  }
  
  const CriarContrato = async (data: ContractRequest): Promise<ContractResponse> => {
    try {
      const response = await api.post<ContractResponse>('/pedido', data);
      return response.data;
  
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          // Use API error message directly
          throw new ContractApiError(
            error.response.data.message || 'Dados inválidos para criar contrato',
            400
          );
        }
        if (error.response?.status === 401) {
          throw new ContractApiError('Não autorizado', 401);
        }
        if (error.response?.status === 403) {
          throw new ContractApiError('Sem permissão para criar contrato', 403);
        }
        if (error.response?.status === 500) {
          throw new ContractApiError('Erro interno do servidor', 500);
        }
  
        throw new ContractApiError(
          'Erro ao criar contrato',
          error.response?.status
        );
      }
  
      throw new ContractApiError('Erro desconhecido ao criar contrato');
    }
  };

  const ObterInformacoesContrato = async (id: number): Promise<any> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const contrato = contratos.find(c => c.id === id);
    if (!contrato) throw new Error('Contrato não encontrado');
  
    return {
      ...contrato,
      representantes: [{ nome: 'Mock', sobrenome: 'User', telefone: '999999999' }],
      detalhesPedido: {
        possuiCamiseta: true,
        possuiMoletom: false,
        possuiCaneca: true,
        possuiTirante: false,
        possuiNomePersonalizado: true,
        possuiAssinaturaCapuzMoletom: false,
        possuiBandeira: true
      },
      detalhesEnvio: {
        type: 'entrega',
        endereco: {
          cep: '12345-678',
          rua: 'Rua Teste',
          number: '123',
          complemento: 'Apto 1',
          bairro: 'Centro',
          cidade: contrato.cidade,
          state: contrato.uf
        }
      },
      alunos: [{
        name: 'Aluno Teste',
        tamanhoCamiseta: 'M',
        tipoCamiseta: 'masculino',
        nomePersonalizado: 'Nome na camisa'
      }]
    };
  };

  export type ObterContratosQuery = {
    pesquisa? : string;
    escola? : string;
    cidade? : string;
    uf? : string;
    paginacao : Paginacao
  }


  // contratoService.ts
const ObterContratos = async ({paginacao, ...q} : ObterContratosQuery) => {

    const filteredContratos = contratos.filter(
        c => !q || (
         (!q.cidade || c.cidade === q.cidade) &&
         (!q.escola || c.escola === q.escola) &&
         (!q.uf || c.uf === q.uf) &&
         (!q.pesquisa || c.nomeResponsavel.toLowerCase().includes(q.pesquisa.toLowerCase()))
        )
      );



    const start = paginacao.pagina * paginacao.linhasPorPagina;
    const end = start + paginacao.linhasPorPagina;
    
    const retorno = {
      data: filteredContratos.slice(start, end),
      total: filteredContratos.length
    }

    return retorno;
  };

const AtualizarContrato= async (id: number, data: ContractRequest): Promise<ContractResponse> => {
  return new Promise<ContractResponse>((resolve, reject) => {});
}
  

export type CorReponse = {
  id: number;
  nome: string;
  hex: string;
}

const ObterCoresCamisa = async () => {
    const response = await api.get<CorReponse[]>('/pedido/cores-camisa');
    return response.data;
}

const ObterCoresMoletom = async () => {
  const response = await api.get<CorReponse[]>('/pedido/cores-moletom');
  return response.data;
}


  const ContratosService = {
    CriarContrato,
    ObterInformacoesContrato,
    ObterContratos,
    AtualizarContrato,
    ObterCoresCamisa,
    ObterCoresMoletom
  };
  
  export default ContratosService;
  
  export {};