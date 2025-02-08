import { useMutation } from "@tanstack/react-query";

import useFormStore from "../helpers/formStore";
import ContratosService from "services/contratoService";
import { mapPedidoFormToApi } from "../helpers/form.helpers";
import { IPedidoForm } from "../helpers/formTypes";

export function useSetPedido(
  onPedidoSalvo: (id: string) => void,
  pedidoId?: string
) {
  const { setPedido } = useFormStore();

  const mutation = useMutation({
    mutationFn: async (data: IPedidoForm) => {
      if (pedidoId) {
        return await ContratosService.AtualizarContrato(
          +pedidoId,
          mapPedidoFormToApi(data)
        );
      } else {
        return await ContratosService.CriarContrato(mapPedidoFormToApi(data));
      }
    },
    onSuccess: (response, data) => {
      setPedido(data);

      if (!pedidoId) {
        onPedidoSalvo(response.toString());
      }
      console.log("Pedido salvo com sucesso:", response);
    },
    onError: (error) => {
      console.error("Erro ao salvar pedido:", error);
    },
  });

  return {
    setPedidoMutation: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
}
