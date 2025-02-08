import { useQuery } from "@tanstack/react-query";
import useFormStore from "../helpers/formStore";
import ContratosService from "services/contratoService";
import { useEffect } from "react";
import { mapApiToPedidoForm } from "../helpers/form.helpers";

export function useGetPedido(pedidoId?: string) {
  const { pedido, setPedido } = useFormStore();

  const query = useQuery({
    queryKey: ["pedido", pedidoId],
    queryFn: async () => {
      if (!pedidoId) return null; // Caso não tenha ID, evita chamada desnecessária
      return await ContratosService.ObterInformacoesContrato(+pedidoId);
    },
    enabled: !!pedidoId,
    staleTime: 1000 * 60 * 5, // Cache de 5 minutos
  });

  useEffect(() => {
    if (query.data && pedidoId) {
      setPedido(mapApiToPedidoForm(query.data));
    }
  }, [query.data, pedidoId, setPedido]);

  return { pedido: pedidoId ? pedido || query.data : pedido, ...query };
}
