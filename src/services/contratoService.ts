import axios from "axios";
import { Paginacao } from "types/extended";
import contratosMock from "./mock";
import api from "@utils/api/apiConfig";

const contratos = contratosMock;

export interface ContractRequest {
  escola: string;
  representantes: RepresentanteDto[];
  possuiBandeira: boolean;
  detalhesEnvio: EnvioDto;
  dataEntrega: Date;
}

export interface EnvioDto {
  tipoEnvio: EPedidoTipoEnvio;
  cep?: string;
  rua?: string;
  numero?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  complemento?: string;
}

export interface RepresentanteDto {
  nome: string;
  sobrenome: string;
  telefone: string;
  principal: boolean;
}

// Enum para EPedidoTipoEnvio
export enum EPedidoTipoEnvio {
  RETIRADA = 1,
  ENTREGA = 2,
}

export class ContractApiError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = "ContractApiError";
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

const CriarContrato = async (data: ContractRequest): Promise<number> => {
  try {
    const response = await api.post<number>("/pedido", data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        // Use API error message directly
        throw new ContractApiError(
          error.response.data.message || "Dados inválidos para criar contrato",
          400
        );
      }
      if (error.response?.status === 401) {
        throw new ContractApiError("Não autorizado", 401);
      }
      if (error.response?.status === 403) {
        throw new ContractApiError("Sem permissão para criar contrato", 403);
      }
      if (error.response?.status === 500) {
        throw new ContractApiError("Erro interno do servidor", 500);
      }

      throw new ContractApiError(
        "Erro ao criar contrato",
        error.response?.status
      );
    }

    throw new ContractApiError("Erro desconhecido ao criar contrato");
  }
};

const ObterInformacoesContrato = async (
  id: number
): Promise<ContractRequest> => {
  try {
    const response = await api.get<ContractRequest>(`/pedido/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new ContractApiError("errrrrrrou");
  }
};

export type ObterContratosQuery = {
  pesquisa?: string;
  escola?: string;
  cidade?: string;
  uf?: string;
  paginacao: Paginacao;
};

// contratoService.ts
const ObterContratos = async ({ paginacao, ...q }: ObterContratosQuery) => {
  const filteredContratos = contratos.filter(
    (c) =>
      !q ||
      ((!q.cidade || c.cidade === q.cidade) &&
        (!q.escola || c.escola === q.escola) &&
        (!q.uf || c.uf === q.uf) &&
        (!q.pesquisa ||
          c.nomeResponsavel.toLowerCase().includes(q.pesquisa.toLowerCase())))
  );

  const start = paginacao.pagina * paginacao.linhasPorPagina;
  const end = start + paginacao.linhasPorPagina;

  const retorno = {
    data: filteredContratos.slice(start, end),
    total: filteredContratos.length,
  };

  return retorno;
};

const AtualizarContrato = async (
  id: number,
  data: ContractRequest
): Promise<number> => {
  return new Promise<number>((resolve, reject) => {});
};

export type CorReponse = {
  id: number;
  nome: string;
  hex: string;
};

const ObterCoresCamisa = async () => {
  const response = await api.get<CorReponse[]>("/pedido/cores-camisa");
  return response.data;
};

const ObterCoresMoletom = async () => {
  const response = await api.get<CorReponse[]>("/pedido/cores-moletom");
  return response.data;
};

const ObterCoresCaneca = async () => {
  const response = await api.get<CorReponse[]>("/pedido/cores-moletom"); // TODO: criar endpoint e atualizar
  return response.data;
};

const ContratosService = {
  CriarContrato,
  ObterInformacoesContrato,
  ObterContratos,
  AtualizarContrato,
  ObterCoresCamisa,
  ObterCoresMoletom,
  ObterCoresCaneca,
};

export default ContratosService;

export {};
