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
      tipoEnvio: form.tipoEntrega, // Assumindo que tipoEntrega corresponde ao enum EPedidoTipoEnvio
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
