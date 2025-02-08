import { ContractRequest } from "services/contratoService";
import { IPedidoForm } from "./formTypes";

export const mapPedidoFormToApi = (form: IPedidoForm): ContractRequest => {
  const representantes = [
    {
      nome: form.nomeRep1,
      sobrenome: form.sobrenomeRep1,
      telefone: form.telefoneRep1,
      principal: form.principalRep1,
    },
  ];

  if (form.nomeRep2) {
    representantes.push({
      nome: form.nomeRep2,
      sobrenome: form.sobrenomeRep2,
      telefone: form.telefoneRep2,
      principal: form.principalRep2,
    });
  }

  return {
    possuiBandeira: form.possuiBandeira,
    escola: form.nomeEscola,
    detalhesEnvio: {
      tipoEnvio: form.tipoEntrega,
      cep: form.cep || undefined,
      rua: form.rua || undefined,
      numero: form.numero || undefined,
      bairro: form.bairro || undefined,
      cidade: form.cidade || undefined,
      estado: form.estado || undefined,
      complemento: form.complemento || undefined,
    },
    representantes,
    dataEntrega: new Date(form.dataEntrega),
  };
};

export const mapApiToPedidoForm = (contract: ContractRequest): IPedidoForm => {
  const representante1 = contract.representantes[0] || {};
  const representante2 = contract.representantes[1] || {};

  return {
    nomeEscola: contract.escola,
    possuiBandeira: contract.possuiBandeira,
    tipoEntrega: contract.detalhesEnvio.tipoEnvio,
    dataEntrega: contract.dataEntrega.toString(),

    nomeRep1: representante1.nome || "",
    sobrenomeRep1: representante1.sobrenome || "",
    telefoneRep1: representante1.telefone || "",
    principalRep1: representante1.principal || false,

    nomeRep2: representante2.nome || undefined,
    sobrenomeRep2: representante2.sobrenome || "",
    telefoneRep2: representante2.telefone || "",
    principalRep2: representante2.principal || false,

    cep: contract.detalhesEnvio.cep || undefined,
    rua: contract.detalhesEnvio.rua || undefined,
    numero: contract.detalhesEnvio.numero || undefined,
    bairro: contract.detalhesEnvio.bairro || undefined,
    cidade: contract.detalhesEnvio.cidade || undefined,
    estado: contract.detalhesEnvio.estado || undefined,
    complemento: contract.detalhesEnvio.complemento || undefined,
  };
};
