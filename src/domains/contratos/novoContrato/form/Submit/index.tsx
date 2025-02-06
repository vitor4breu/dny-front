import { Box, Button } from "@mui/material";
import useFormStore from "../formStore";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Aluno } from "../../types";
import ContratosService, { ContractRequest } from "services/contratoService";
import { toast } from "react-toastify";

interface FormState {
  isSubmitting: boolean;
  isLoading: boolean;
}

const SubmitForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formState, setFormState] = useState<FormState>({
    isSubmitting: false,
    isLoading: isEditMode,
  });

  const escolaInput = useFormStore((state) => state.escolaInput);
  const detalhesEnvio = useFormStore((state) => state.detalhesEnvio);
  const detalhesPedido = useFormStore((state) => state.detalhesPedido);
  const alunos = useFormStore((state) => state.alunos);
  const representantes = useFormStore((state) => state.representantes);

  const validateForm = () => {
    console.log("validadeForm");
    if (!escolaInput.escola.trim()) {
      escolaInput.error = "Nome da escola é obrigatório";
      toast.error("Nome da escola é obrigatório");
      return false;
    }

    return true;
  };

  const displayValidationErrors = (
    errors: Array<Partial<Record<keyof Aluno, string>>>
  ) => {
    const errorMessages = Object.entries(errors)
      .filter(([_, message]) => message)
      .map(([field, message]) => ({
        field: field as keyof Aluno,
        message: message as string,
      }));

    if (errorMessages.length > 0) {
      toast.error(
        <div>
          <strong>Corrija os seguintes erros:</strong>
          {errorMessages.map(({ field, message }, index) => (
            <div key={`${field}-${index}`}>
              • {field}: {message}
            </div>
          ))}
        </div>,
        { autoClose: 5000, style: { maxWidth: "400px" } }
      );
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setFormState((prev) => ({ ...prev, isSubmitting: true }));

    let alunosRequest = alunos;

    if (!detalhesPedido.possuiCaneca)
      alunosRequest = alunosRequest.map((aluno) => ({
        ...aluno,
        caneca: undefined,
      }));

    if (!detalhesPedido.possuiMoletom)
      alunosRequest = alunosRequest.map((aluno) => ({
        ...aluno,
        moletom: undefined,
      }));

    if (!detalhesPedido.possuiCamiseta)
      alunosRequest = alunosRequest.map((aluno) => ({
        ...aluno,
        camisa: undefined,
      }));

    if (!detalhesPedido.possuiTirante)
      alunosRequest = alunosRequest.map((aluno) => ({
        ...aluno,
        caneca: { ...aluno.caneca, tirante: false, idCor: 0 }, // TODO: veriricar pq precisou pasasr o idCor aqui
      }));

    if (!detalhesPedido.possuiNomePersonalizado) {
      alunosRequest = alunosRequest.map((aluno) => ({
        ...aluno,
        caneca: aluno.caneca
          ? {
              ...aluno.caneca,
              nomePersonalizado: undefined,
            }
          : undefined,
        moletom: aluno.moletom
          ? {
              ...aluno.moletom,
              nomePersonalizado: undefined,
            }
          : undefined,
        camisa: aluno.camisa
          ? {
              ...aluno.camisa,
              nomePersonalizado: undefined,
            }
          : undefined,
      }));
    }

    const formData: ContractRequest = {
      escola: escolaInput.escola,
      possuiBandeira: detalhesPedido.possuiBandeira,
      detalhesEnvio,
      alunos: alunosRequest,
      representantes,
    };

    try {
      if (isEditMode) {
        await ContratosService.AtualizarContrato(Number(id), formData);
        toast.success("Contrato atualizado com sucesso!");
      } else {
        await ContratosService.CriarContrato(formData);
        toast.success("Contrato criado com sucesso!");
      }
      navigate("/contratos");
    } catch (error) {
      toast.error(`Erro ao ${isEditMode ? "atualizar" : "criar"} contrato`);
      console.error("Error:", error);
    } finally {
      setFormState((prev) => ({ ...prev, isSubmitting: false }));
    }
  };

  return (
    <Box display="flex" justifyContent="flex-end">
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={formState.isSubmitting}
        sx={{
          fontWeight: "bold",
          fontSize: "0.9rem",
          padding: "8px 24px",
        }}
      >
        {formState.isSubmitting
          ? isEditMode
            ? "Atualizando..."
            : "Criando..."
          : isEditMode
          ? "Atualizar Contrato"
          : "Criar Contrato"}
      </Button>
    </Box>
  );
};

export default SubmitForm;
