import { Aluno } from "domains/contratos/novoContrato/types";
import { IAlunoForm } from "domains/contratos/novoContrato/types/formTypes";

export const createAluno = (data: IAlunoForm) => {
  const aluno: Aluno = {
    nome: data.nomeAluno,
    ...(data.possuiCamiseta && {
      camisa: {
        tamanho: +data.tamanhoCamiseta,
        modelagem: +data.modeloCamiseta,
        idCor: +data.corCamiseta,
        nomePersonalizado: data.nomePersonalizadoCamiseta,
      },
    }),
    ...(data.possuiMoletom && {
      moletom: {
        tamanho: +data.tamanhoMoletom,
        modelagem: +data.modeloMoletom,
        idCor: +data.corMoletom, // Corrigi para `corMoletom` caso seja um erro de referência
        assinaturaCapuz: data.possuiAssinaturaMoletom,
        nomePersonalizado: data.nomePersonalizadoMoletom,
      },
    }),
    ...(data.possuiCaneca && {
      caneca: {
        idCor: +data.corCaneca,
        nomePersonalizado: data.nomePersonalizadoCaneca,
        tirante: data.possuiTiranteCaneca,
      },
    }),
  };

  return aluno;
};

export const createFormFromAluno = (aluno: Aluno): IAlunoForm => {
  return {
    nomeAluno: aluno.nome,
    possuiCamiseta: !!aluno.camisa,
    modeloCamiseta: aluno.camisa ? String(aluno.camisa.modelagem) : "",
    tamanhoCamiseta: aluno.camisa ? String(aluno.camisa.tamanho) : "",
    corCamiseta: aluno.camisa ? String(aluno.camisa.idCor) : "",
    nomePersonalizadoCamiseta: aluno.camisa?.nomePersonalizado || "",

    possuiMoletom: !!aluno.moletom,
    modeloMoletom: aluno.moletom ? String(aluno.moletom.modelagem) : "",
    tamanhoMoletom: aluno.moletom ? String(aluno.moletom.tamanho) : "",
    corMoletom: aluno.moletom ? String(aluno.moletom.idCor) : "",
    possuiAssinaturaMoletom: aluno.moletom?.assinaturaCapuz || false,
    nomePersonalizadoMoletom: aluno.moletom?.nomePersonalizado || "",

    possuiCaneca: !!aluno.caneca,
    corCaneca: aluno.caneca ? String(aluno.caneca.idCor) : "",
    possuiTiranteCaneca: aluno.caneca?.tirante || false,
    nomePersonalizadoCaneca: aluno.caneca?.nomePersonalizado || "",

    possuiNomePersonalizadoCamiseta: !!aluno.camisa?.nomePersonalizado,
    possuiNomePersonalizadoMoletom: !!aluno.moletom?.nomePersonalizado,
    possuiNomePersonalizadoCaneca: !!aluno.caneca?.nomePersonalizado,
  };
};
